import { AllMaterialMaquetteServices } from '../src/services';
import { Page } from '../src/router';
import { createButton } from '../src/components/button';
import { createContent } from '../src/components/content';
import { h } from 'maquette';
import { createGrid } from '../src/components/grid';
import { createCard } from '../src/components/card';
import { DialogConfig } from '../src/dialog-service';

export let createDialogPage = (services: AllMaterialMaquetteServices): Page => {

  let approveButton = createButton(services, {text: 'approve', onClick: services.dialogService.hideDialog});
  let denyButton = createButton(services, {text: 'deny', onClick: services.dialogService.hideDialog});
  let dialog1: DialogConfig = {
    closeRequested: services.dialogService.hideDialog,
    title: () => 'Dialog title',
    content: () => h('div', ['A modal dialog that you can approve or deny']),
    actions: () => [
      approveButton.renderMaquette(),
      denyButton.renderMaquette()
    ]
  };

  let content = createContent({ backgroundGray100: true });

  let button1 = createButton(services, {
    text: 'Start modal dialog',
    raised: true,
    onClick: () => services.dialogService.showDialog(dialog1)
  });

  let grid = createGrid({ maxWidth: 1024 });

  let card1 = createCard({ shadowDp: 4, cellColumns: 12 });

  return {
    renderPlaceholders: {
      title: () => h('div', ['Modal dialog']),
      content: () => content.wrap(() => ([
        grid.wrap(() => [
          card1.wrap({
            title: () => 'Dialogs',
            supportingText: () => [
              button1.renderMaquette()
            ]
          })
        ])
      ]))
    }
  };
};