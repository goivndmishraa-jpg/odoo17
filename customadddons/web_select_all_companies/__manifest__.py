{
    "name": "Web - Select All Companies Button",
    "version": "17.0.1.0.0",
    "summary": "Adds a small floating button to select all companies in the company switcher",
    "author": "You / GPT",
    "license": "LGPL-3",
    "depends": ["web"],
    "assets": {
        "web.assets_backend": [
            "web_select_all_companies/static/src/js/select_all_companies.js",
            "web_select_all_companies/static/src/css/select_all_companies.css",
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
}
