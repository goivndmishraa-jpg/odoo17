from odoo import fields, models

class Property(models.Model):
    _name="estate.property"
    _description="this is first model"

    name=fields.Char(string="Name")
    property_type_id=fields.Many2one("estate.property.type",string="property_type")
    description=fields.Char(string="description")
    postcode=fields.Char(string="postcode")
    date_availability=fields.Date(string="available from")
    expecteed_price = fields.Float(string="expected Price")
    best_offer= fields.Float(string="Best offer")
    selling_price = fields.Float(string="selling price")
    bedrooms = fields.Integer(string="bedrooms")
    living_area= fields.Integer(string="living area (sqm)")
    facades = fields.Integer(string="Facades")
    garage= fields.Boolean(string="garage", default=False)
    garden=fields.Boolean(string="garden", default=False)
    garden_area=fields.Integer(string="garden area", )
    gardern_orientation = fields.Selection([("north","north"),("south","south"),("East","East"),("West","West")],string="garden orientation")


class Property_type(models.Model):
    _name="estate.property.type"
    _description="for the types of Property present"

    name=fields.Char(String="Property Name")

    