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
                "select",
                "All Companies",
                "Mfg Companies",
                "Service Companies"
            ]
            let mfgcompanies=["SHM Shipcare Pvt. Ltd., MFG / BOAT","SHM Shipcare Pvt. Ltd, HIRE - ONGC","SHM Shipcare Pvt. Ltd., HIRE","SHM Shipyard Pvt. Ltd.","SHM Shipcare Pvt. Ltd., SRU Mumbai"];
            let servicecompanies=["SHM Shipcare Pvt. Ltd., MAN","SHM Shipcare Pvt. Ltd., GUJ","SHM Shipcare Pvt. Ltd., CHE","SHM Shipcare Pvt. Ltd., KOC"]
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
            let patchh="select"
            btn.addEventListener("click", () => {
                if(patchh==btn.value){
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
                            mfgcompanies.map(individualcompany=>{
                                console.log(individualcompany)
                                toggles.forEach(toggledata=>{
                                    
                                        if (toggledata.getAttribute("aria-label")==individualcompany){
                                            const isChecked= toggledata.getAttribute("aria-checked")=="true";
                                            if(!isChecked){
                                                toggledata.click();
                                            }
                                        }else{
                                            console.log(toggledata);
                                        if(toggledata.getAttribute("aria-checked")=="true"){
                                            toggledata.click()
                                        }
                                        console.log(toggledata, "c")
                                        }
                                })
                            })
                            console.log("hi")
                        } else if(btn.value == "Service Companies") {

                            
                            toggles.forEach(t => {
                                if (t.getAttribute("aria-checked") == "true") {
                                    t.click();
                                }
                            });

                           
                            servicecompanies.forEach(companyName => {
                               toggles.forEach(toggledata=>{
                                    
                                        if (toggledata.getAttribute("aria-label")==companyName){
                                            const isChecked= toggledata.getAttribute("aria-checked")=="true";
                                            if(!isChecked){
                                                toggledata.click();
                                            }
                                        }else{
                                            console.log(toggledata);
                                        if(toggledata.getAttribute("aria-checked")=="true"){
                                            toggledata.click()
                                        }
                                        console.log(toggledata, "c")
                                        }
                                })
                            });
                        }

                        
                    

                    console.log(`✅ Selected ${toggles.length} companies`);
                }, 500);
            });

            console.log("✅ Select All Companies button added successfully.");
        }, 2000);
    },
});
