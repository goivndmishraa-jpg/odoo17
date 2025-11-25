/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { WebClient } from "@web/webclient/webclient";

patch (WebClient.prototype,{
    setup(){
        super.setup()
        setTimeout(()=>{
            const companyMenuButton = document.querySelector(".o_switch_company_menu .dropdown-toggle");
            if (!companyMenuButton) {
                console.warn("Could not find the company menu button in your layout.");
                return;
            }
            if (document.querySelector("#selectAllCompaniesButton")) return;
            const btn = document.createElement("button");
            btn.id='select only mfg companies'
            btn.innerText="mfg companies"
            Object.assign(btn.style, {
                position: "fixed",
                top: "20px",           
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
            document.body.appendChild(btn)
            btn.addEventListener("click",(self=btn)=>{
                companyMenuButton.click();
                setTimeout(()=>{
                    const toggle=document.querySelectorAll(".o_switch_company_menu [role='menuitemcheckbox']");
                    if(toggle.length==0){
                        alert("could not find any company ");
                        return;
                    }
                    let mfgcompany=["SHM Products Pvt. Ltd., Mumbai"]
                    mfgcompany.map(individualcompany=>{
                            toggle.forEach(toggledata=>{
                            
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
                    
                },500)
            })
        },2000)
    }
})