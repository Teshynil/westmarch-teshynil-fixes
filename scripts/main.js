/**
 * Registers hook callbacks.
 */

import * as core from "./world-currency-5e.js";
import { registerSettings } from "./settings.js";
import * as compatibility from "./compatibility.js";
import * as convert from "./convert.js";

// Core Hooks

Hooks.once("init", () => {
    registerSettings();
});

Hooks.on("ready", function() {
    core.patchCurrencies();
});

Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
    if(game.settings.get("world-currency-5e", "RemoveConverter")) {
        core.removeConvertCurrency(html);
    }
    if(game.settings.get("world-currency-5e", "cpAltRemove")) {
        core.removeCurrencyCp(html);
    }
    if(game.settings.get("world-currency-5e", "spAltRemove")) {
        core.removeCurrencySp(html);
    }
    if(game.settings.get("world-currency-5e", "epAltRemove")) {
        core.removeCurrencyEp(html);
    }
    if(game.settings.get("world-currency-5e", "gpAltRemove")) {
        core.removeCurrencyGp(html);
    }
    if(game.settings.get("world-currency-5e", "ppAltRemove")) {
        core.removeCurrencyPp(html);
    }
    // This is only necessary for tidy5e.
    compatibility.alterCharacterCurrency(html);

    let element=`
<li class="currency-item dt" title="Downtime">
    <input type="number" step="any" name="system.currency.dt" id="${sheet.appId}-system.currency.dt" value="${sheet.actor.system.currency.dt??0}">
    <label for="${sheet.appId}-system.currency.dt" class="denomination dt" data-denom="dt">DT</label>
</li>`
    let extra=$(element);

    let header=html.find('.inventory-currency li.currency-header')
    header.after(extra);

    console.log("world-currency-5e | Altered character sheet");
});

Hooks.on('renderActorSheet5eVehicle', (sheet, html) => {
    if(game.settings.get("world-currency-5e", "RemoveConverter")) {
        core.removeConvertCurrency(html);
    }
    if(game.settings.get("world-currency-5e", "cpAltRemove")) {
        core.removeCurrencyCp(html);
    }
    if(game.settings.get("world-currency-5e", "spAltRemove")) {
        core.removeCurrencySp(html);
    }
    if(game.settings.get("world-currency-5e", "epAltRemove")) {
        core.removeCurrencyEp(html);
    }
    if(game.settings.get("world-currency-5e", "gpAltRemove")) {
        core.removeCurrencyGp(html);
    }
    if(game.settings.get("world-currency-5e", "ppAltRemove")) {
        core.removeCurrencyPp(html);
    }
    console.log("world-currency-5e | Altered vehicle sheet");
});

Hooks.on('renderItemSheet', (sheet, html, data) => {
    let standard = game.settings.get("world-currency-5e", "Standard");
    if (!(game.user.isGM && standard == 'gp')) {
        html.find('[name="system.price"]').prop('disabled', true);
        html.find('[name="system.price"]').prop('type', "text");
        html.find('[name="system.price"]').val(convert.formatCurrency(convert.gpToStandard(data.system.price)));
    }
});

// Compatibility with other modules:

// Tidy 5e NPC Sheet
Hooks.on('renderActorSheet5eNPC', (sheet, html) => {
    if (game.modules.get('tidy5e-sheet')?.active && sheet.constructor.name === 'Tidy5eNPC') {
        compatibility.alterCharacterCurrency(html);
        if(game.settings.get("world-currency-5e", "RemoveConverter")) {
            core.removeConvertCurrency(html);
        }
        if(game.settings.get("world-currency-5e", "cpAltRemove")) {
            core.removeCurrencyCp(html);
        }
        if(game.settings.get("world-currency-5e", "spAltRemove")) {
            core.removeCurrencySp(html);
        }
        if(game.settings.get("world-currency-5e", "epAltRemove")) {
            core.removeCurrencyEp(html);
        }
        if(game.settings.get("world-currency-5e", "gpAltRemove")) {
            core.removeCurrencyGp(html);
        }
        if(game.settings.get("world-currency-5e", "ppAltRemove")) {
            core.removeCurrencyPp(html);
        }
        console.log("world-currency-5e | Altered Tidy5eNPC");
    }
});

// Tidy 5e Vehicle Sheet
Hooks.on('renderActorSheet5eVehicle', (sheet, html) => {
    if (game.modules.get('tidy5e-sheet')?.active && sheet.constructor.name === 'Tidy5eVehicle') {
        compatibility.alterCharacterCurrency(html);
        console.log("world-currency-5e | Altered Tidy5eVehicle");
    }

    if(game.settings.get("world-currency-5e", "RemoveConverter")) {
        core.removeConvertCurrency(html);
    }
});

// Let's Trade 5e
Hooks.on('renderTradeWindow', (sheet, html) => {
    compatibility.alterTradeWindowCurrency(html);
    console.log("world-currency-5e | Altered Trade Window Currency");
});

Hooks.on('renderDialog', (sheet, html) => {
    if (game.modules.get('world-currency-5e')?.active && sheet.title === 'Incoming Trade Request') {
        compatibility.alterTradeDialogCurrency(html);
        console.log("world-currency-5e | Altered Trade Dialog Currency");
    }
});

// Party Overview
Hooks.on('renderPartyOverviewApp', (sheet, html) => {
    compatibility.alterPartyOverviewWindowCurrency(html);
    console.log("world-currency-5e | Altered Party Overview");
});

// Loot Sheet 5e
Hooks.on('renderLootSheet5eNPC', (sheet, html, data) => {
    $.each($('.item-price'), function(index, value) {
        $(value).text(convert.formatCurrency(convert.gpToStandard(parseInt($(value).text()))));
    });
    console.log("world-currency-5e | Altered Sheet");
});
