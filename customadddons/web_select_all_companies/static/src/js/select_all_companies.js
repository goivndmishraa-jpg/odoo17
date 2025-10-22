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
                top: "10px",
                right: "180px",
                zIndex: 9999,
                padding: "6px 12px",
                background: "#875A7B",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
            });
            document.body.appendChild(btn);

            btn.addEventListener("click", () => {
                companyMenuButton.click();

                setTimeout(() => {
                    // Select all company toggle divs instead of inputs
                    const toggles = document.querySelectorAll(".o_switch_company_menu [role='menuitemcheckbox']");
                    if (toggles.length === 0) {
                        alert("Could not find any company toggle elements — menu structure may differ.");
                        return;
                    }

                    toggles.forEach(toggle => {
                        const isChecked = toggle.getAttribute("aria-checked") === "true";
                        if (!isChecked) {
                            toggle.click(); // triggers the company selection
                        }
                    });

                    console.log(`✅ Selected ${toggles.length} companies`);
                }, 500);
            });

            console.log("✅ Select All Companies button added successfully.");
        }, 2000);
    },
});
