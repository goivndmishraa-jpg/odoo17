/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { WebClient } from "@web/webclient/webclient";

patch(WebClient.prototype, {
    setup() {
        super.setup();

        setTimeout(() => {
            const companyMenuButton = document.querySelector(".o_switch_company_menu .dropdown-toggle");
            if (!companyMenuButton) {
                console.warn("Could not find the company menu button in your layout.");
                return;
            }

            if (document.querySelector("#selectAllCompaniesButton")) return;

            const btn = document.createElement("button");
            btn.id = "selectAllCompaniesButton";
            btn.innerText = "Select all companies";
            Object.assign(btn.style, {
                position: "fixed",
                top: "8px",           
                right: "400px",       
                zIndex: 9999,
                padding: "5px 14px",
                background: "#875A7B",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                transition: "background 0.2s, transform 0.1s",
            });

            btn.addEventListener("mouseenter", () => {
                btn.style.background = "#9b6793";
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.background = "#875A7B";
            });

            document.body.appendChild(btn);

            btn.addEventListener("click", () => {
                companyMenuButton.click();

                setTimeout(() => {
                    
                    const toggles = document.querySelectorAll(".o_switch_company_menu [role='menuitemcheckbox']");
                    if (toggles.length === 0) {
                        alert("Could not find any company toggle elements — menu structure may differ.");
                        return;
                    }

                    toggles.forEach(toggle => {
                        const isChecked = toggle.getAttribute("aria-checked") === "true";
                        if (!isChecked) {
                            toggle.click(); 
                        }
                    });

                    console.log(`✅ Selected ${toggles.length} companies`);
                }, 500);
            });

            console.log("✅ Select All Companies button added successfully.");
        }, 2000);
    },
});
