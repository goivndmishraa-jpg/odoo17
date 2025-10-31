from odoo import models, fields
from datetime import date
import base64
from io import BytesIO
import xlsxwriter

class StockCOGSReport(models.TransientModel):
    _name = 'stock.cogs.report'
    _description = 'COGS Report Wizard'

    date_from = fields.Date(default=lambda self: date(date.today().year, 4, 1))
    date_to = fields.Date(default=lambda self: date.today())

    def get_cogs_data(self, date_from, date_to):
        ValuationLayer = self.env['stock.valuation.layer']
        products = self.env['product.product'].search([])
        result = []
        for product in products:
            opening_val = sum(ValuationLayer.search([
                ('product_id', '=', product.id),
                ('create_date', '<', date_from)
            ]).mapped('value'))
            purchase_val = sum(ValuationLayer.search([
                ('product_id', '=', product.id),
                ('create_date', '>=', date_from),
                ('create_date', '<=', date_to),
                ('description', 'ilike', 'Receipt')
            ]).mapped('value'))
            closing_val = sum(ValuationLayer.search([
                ('product_id', '=', product.id),
                ('create_date', '<=', date_to)
            ]).mapped('value'))
            cogs = opening_val + purchase_val - closing_val
            result.append({
                'product': product.display_name,
                'opening_value': opening_val,
                'purchase_value': purchase_val,
                'closing_value': closing_val,
                'cogs': cogs
            })
        return result

    def action_download_excel(self):
        data = self.get_cogs_data(self.date_from, self.date_to)

        # Create Excel in memory
        output = BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        sheet = workbook.add_worksheet('COGS Report')

        # Header format
        header_format = workbook.add_format({'bold': True, 'bg_color': '#D3D3D3', 'border': 1})
        money_format = workbook.add_format({'num_format': '#,##0.00'})

        headers = ['Product', 'Opening Value', 'Purchase Value', 'Closing Value', 'COGS']
        for col, header in enumerate(headers):
            sheet.write(0, col, header, header_format)

        # Write data rows
        for row, line in enumerate(data, start=1):
            sheet.write(row, 0, line['product'])
            sheet.write_number(row, 1, line['opening_value'], money_format)
            sheet.write_number(row, 2, line['purchase_value'], money_format)
            sheet.write_number(row, 3, line['closing_value'], money_format)
            sheet.write_number(row, 4, line['cogs'], money_format)

        workbook.close()
        output.seek(0)

        # Encode Excel file
        xlsx_data = base64.b64encode(output.read())
        output.close()

        # Create attachment for download
        attachment = self.env['ir.attachment'].create({
            'name': 'COGS_Report.xlsx',
            'type': 'binary',
            'datas': xlsx_data,
            'mimetype': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'res_model': self._name,
            'res_id': self.id,
        })

        # Trigger file download
        return {
            'type': 'ir.actions.act_url',
            'url': f'/web/content/{attachment.id}?download=true',
            'target': 'new',
        }
