{
    'name': 'Sales Filter Extension',
    'version': '1.0',
    'summary': 'Adds extra filters to Sales Orders',
    'description': 'Adds useful filters to the Sales Quotation / Order list view.',
    'author': 'Your Name',
    'depends': ['sale'],
    'data': [
        'views/sale_order_filter_inherit.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}
