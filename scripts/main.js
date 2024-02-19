/**
 * Registers hook callbacks.
 */
// Core Hooks

Hooks.once("init", () => {
    //registerSettings();
});

Hooks.on("ready", function() {
    
});

Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
    let readOnly = html.find('.currency-item.gp>input')[0].disabled ?? false;
    let element = `
<li class="currency-item dt svelte-1f5b7f4" title="Downtime">
    <input type="number" step="any" name="flags.tidy5e-sheet.dt" id="${sheet.appId}-flags.tidy5e-sheet.dt" value="${sheet.actor.flags['tidy5e-sheet'].dt??0}" ${readOnly?"disabled=true":""}>
    <label for="${sheet.appId}-flags.tidy5e-sheet.dt" class="denomination dt" data-denom="dt">DT</label>
</li>`
    let extra=$(element);

    let header=html.find('.inventory-currency li.currency-header')
    header.after(extra);

    console.log("westmarch-teshynil-fixes | Altered character sheet");
});

Hooks.on('renderActorSheetFlags', (sheet, html) => {
    let element = `
<div class="form-group">
    <label>Inventory Capacity Multiplier</label>
    <input type="text" name="flags.westmarch-teshynil-fixes.capacityMultiplier" value="1">
</div>`
    let extra=$(element);

    let header=html.find('section .form-body');
    header.append(extra);

    console.log("westmarch-teshynil-fixes | Altered character sheet flags");
});
