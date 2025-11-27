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

            const btn = document.createElement("select");
            btn.id = "selectAllCompaniesButton";
            let options=[
                "select Companies",
                "All Companies",
                "Mfg Companies",
                "Service/store Companies"
            ]
            let mfgcompanies=["SHM Shipcare Pvt. Ltd., MFG / BOAT","SHM Shipyard Pvt. Ltd.","SHM Shipcare Pvt. Ltd., SRU Mumbai","SHM Products Pvt Ltd., Mumbai","SHM Products Pvt. Ltd., Chennai","SHM Shipcare Pvt. Ltd., PRD","SHM Shipcare Pvt. Ltd., LRD","SHM Shipcare Pvt. Ltd., ONGC / LBD","SHM Shipcare Pvt. Ltd., BAS"];
            let servicecompanies=["SHM Fire Safety Pte. Ltd.","SHM Fire Safety Pvt Ltd., Multy","SHM Shipcare Pvt. Ltd., MTA","The SHM Store(Shipcare), Kolkata DES","SHM Shipcare Pvt. Ltd., FSD","SHM Shipcare Pvt. Ltd., LSA","SHM Shipcare Pvt. Ltd, HIRE - ONGC","SHM Shipcare Pvt. Ltd., HIRE","SHM Shipcare Pvt. Ltd., MSD","SHM Shipcare Pvt. Ltd., PRJ","SHM Shipcare Pvt. Ltd., VZG","SHM Shipcare Pvt. Ltd., PTB","SHM Shipcare Pvt. Ltd., KOL","SHM Shipcare Pvt. Ltd., KOC","SHM Shipcare Pvt. Ltd., CHE","SHM Shipcare Pvt. Ltd., GUJ","SHM Shipcare Pvt. Ltd., MAN","The SHM Store, Kolkata DES","The SHM Store, Chennai","The SHM Store, Kochi","The SHM Store, Kolkata","The SHM Store, Mumbai","The SHM Store, Port Blair","The SHM Store, Visakhapatnam","SHM Shipcare Pvt Ltd., CRP",]
            options.forEach(val=>{
               let t=document.createElement("option")
               t.value=val
               t.textContent=val
               btn.appendChild(t)
            })

            Object.assign(btn.style, {

                width:"200px",
                height:"40px",
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
            btn.style.color="black"

            btn.addEventListener("mouseenter", () => {
                btn.style.background = "#9b6793";
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.background = "#875A7B";
            });

            document.body.appendChild(btn);
            
            btn.addEventListener("click", () => {
                if("select Companies"==btn.value){
                    return;
                }
                companyMenuButton.click();
                console.log(companyMenuButton,btn.value)
                
                setTimeout(() => {
                    
                    const toggles = document.querySelectorAll(".o_switch_company_menu [role='menuitemcheckbox']");
                    if (toggles.length === 0) {
                        alert("Could not find any company toggle elements — menu structure may differ.");
                        return;
                    }

                    
                        if(btn.value=="All Companies"){
                            
                                toggles.forEach(toggle => {
                                    const isChecked = toggle.getAttribute("aria-checked") === "true";
                                    if (!isChecked) {
                                        toggle.click(); 
                                    }
                                });
                                
                                
                            
                        }else if(btn.value=="Mfg Companies"){
                           const companySet = new Set(mfgcompanies);

                            toggles.forEach(toggle => {
                                const label = toggle.getAttribute("aria-label");
                                const isChecked = toggle.getAttribute("aria-checked") === "true";
                                const shouldBeChecked = companySet.has(label);

                                if (shouldBeChecked && !isChecked) {
                                    toggle.click();          
                                } 
                                else if (!shouldBeChecked && isChecked) {
                                    toggle.click();          
                                }
                            });
                           
                        } else if(btn.value == "Service/store Companies") {

                       
                            const companySet = new Set(servicecompanies);

                            toggles.forEach(toggle => {
                                const label = toggle.getAttribute("aria-label");
                                const isChecked = toggle.getAttribute("aria-checked") === "true";
                                const shouldBeChecked = companySet.has(label);

                                if (shouldBeChecked && !isChecked) {
                                    toggle.click();          // select it
                                } 
                                else if (!shouldBeChecked && isChecked) {
                                    toggle.click();          // unselect it
                                }
                            });

                        }

                        
                    

                    console.log(`✅ Selected ${toggles.length} companies`);
                }, 500);
            });

            console.log("✅ Select All Companies button added successfully.");
        }, 2000);
    },
});
