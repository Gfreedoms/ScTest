import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoClass from "dojo/dom-class";
import * as dojoStyle from "dojo/dom-style";
import * as dom from "dojo/dom";

import * as FB from "fb";
import "./ui/fb.css";

class SocialCount extends WidgetBase {

    // Parameters to be configured in the modeler.
    AppId: string;
    AppSecret: string;
    AppToken: string;
    microflowToExecute: string;

    // Private variables
    private contextObject: mendix.lib.MxObject;

    postCreate() {
               domConstruct.create("div", {
            class: "wrapper-page",
            id: "fans",
            innerHTML: ``
        }, this.domNode);
    }

    update(object: mendix.lib.MxObject, callback?: () => void) {
        this.contextObject = object;
        this.resetSubscription();
        this.setupEvents();
        this.updateRendering(callback);
        if (callback) {
            callback();
        }
    }

    private execMicroflow(microflow: string, guid: string, callback?: () => {}) {
        if (microflow && guid) {
            mx.ui.action(microflow, {
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                },
                callback: () => {},
                error: (error) => { mx.ui.error("Error executing microflow " + microflow + " : " + error.message); }
            }, this);
        }
    }

    private setupEvents() {
        if (this.microflowToExecute) {
            this.execMicroflow(this.microflowToExecute, this.contextObject.getGuid());
        }
    }

    private updateRendering(callback?: any) {
        if (this.contextObject) {
            FB.options({ version: "v2.10" });
            const SocialCount = FB.extend(this.contextObject.get(this.AppId), this.contextObject.get(this.AppSecret));
            FB.setAccessToken(this.contextObject.get(this.AppToken));
            FB.api(this.contextObject.get(this.AppId) as string
                + "?fields=name, fan_count", (response: any) => {
                    if (!response || response.error) {
                        mx.ui.error(!response ? "error occurred" : response.error);
                        return;
                    }else {
                                   dom.byId("fans").innerHTML = `
                                                                        
                                      <ul class="social-mini">
                                        <li>
                                        <div class="bubble"><span>868</span></div>
                                        </li>
                                        <li>
                                        <div class="bubble"><span>${response.fan_count}</span></div>
                                        </li>
                                        <li>
                                        <div class="bubble"><span>28</span></div>
                                        </li>
                                    </ul>
                                                 
                `;}
            });
        }
    }

    resetSubscription() {
        this.unsubscribeAll();
        if (this.contextObject) {
            this.subscribe({
                guid: this.contextObject.getGuid(),
                callback: ((guid) => {
                    this.updateRendering();
                })
            });
        }
    }
}

dojoDeclare("widget.SocialCount", [WidgetBase], function (Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(SocialCount));
