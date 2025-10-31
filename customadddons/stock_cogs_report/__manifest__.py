{
    'name': 'Stock COGS Report',
    'version': '1.0',
    'depends': ['stock', 'purchase', 'account'],
    'data': [
        "security/ir.model.access.csv",
        'views/stock_cogs_menu.xml',
        'report/stock_cogs_template.xml',
    ],
}
