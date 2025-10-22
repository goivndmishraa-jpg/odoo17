from odoo import fields, models,api

class Property(models.Model):
    _name="estate.property"
    _description="this is first model"

    name=fields.Char(string="Name" , required=True)
    property_type_id=fields.Many2one("estate.property.type",string="property type")
    property_tag_ids=fields.Many2many("estate.property.tag", string="property tag")
    property_offers_id=fields.One2many("estate.property.offers","property_id",string="property offers")
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
    salesperson=fields.Many2one("res.users",string="sales person")
    customer=fields.Many2one("res.partner", string="customer",    domain="[('is_company', '=', True)]")
    Taxid=fields.Char(string="Tax ID",related="customer.vat")
    totalarea=fields.Integer(string="total area", compute="gettotalarea",inverse="getlivingarea")
    @api.depends('living_area','garden_area')
    def gettotalarea(self):
        for ref in self:
            ref.totalarea=ref.living_area+ref.garden_area

    
    def getlivingarea(self):
        for ref in self :
            ref.living_area=ref.totalarea-ref.garden_area   



class Property_type(models.Model):
    _name="estate.property.type"
    _description="for the types of Property present"

    name=fields.Char(string="Property Name", required=True)

class Property_tag(models.Model):
    _name="estate.property.tag"
    _description="for the tags in the property"

    name=fields.Char(string="tag name", required=True)

class property_offers(models.Model):
    _name="estate.property.offers"
    _description="This is the offers present in each property"

    name=fields.Char(string="Offer Name" ,required=True)
    price=fields.Float(string="Price")
    Validity=fields.Integer(string="validity")
    deadline=fields.Date(string="deadline")
    patner_id=fields.Many2one("res.partner", string="customer" )
    property_id=fields.Many2one("estate.property" , string="property id", default="estate.property" , readonly=True)