from odoo import models,api, fields

class cogsmodel(models.Model):
    _name='cogs.report.model'
    _description='this is cogs model'
    
    name=fields.char(string="name")