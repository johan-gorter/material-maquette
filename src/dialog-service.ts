import { Component, Projector, VNodeChild } from 'maquette';
import { createDialog, Dialog } from './components/dialog';
import { createButton } from './components/button';
import {MDCService} from "./mdc-service";

export interface DialogConfig {
  title: () => string;
  content: () => VNodeChild;
  actions: () => VNodeChild;
  /**
   * When the user presses close, clicks the curtain or presses esc
   */
  closeRequested: () => void;
  /**
   * When the user presses enter inside the dialog
   */
  submitRequested?: () => void;
  /**
   * Always called when the dialog is destroyed
   */
  exit?: () => void;
}

export interface DialogService {
  showDialog: (config: DialogConfig) => void;
  hideDialog: () => void;
  showConfirm: (title: string, question: string, strings: ConfirmStrings) => Promise<boolean>;
}

export interface ConfirmStrings {
  ok: string;
  cancel: string;
}

export let createDialogService = (dependencies: {projector: Projector, mdcService: MDCService}): DialogService & Component => {
  let {projector} = dependencies;
  let dialogs: Dialog[] = [];
  let dialogService = {
    showDialog: (config: DialogConfig) => {
      let dialog = createDialog(config);
      dialogs.push(dialog);
    },
    showConfirm: (title: string, question: string, strings?: ConfirmStrings): Promise<boolean> => {
      return new Promise<boolean>((resolve, reject) => {
        let ok = () => {
          resolve(true);
          dialogService.hideDialog();
        };
        let cancel = () => {
          resolve(false);
          dialogService.hideDialog();
        };
        let okButton = createButton(dependencies, {text: strings ? strings.ok : 'Ok', raised: true, onClick: ok});
        let cancelButton = createButton(dependencies, {text: strings ? strings.cancel : 'Cancel', onClick: cancel});
        let dialog: DialogConfig = {
          title: () => title,
          content: () => question,
          actions: () => [okButton.renderMaquette(), cancelButton.renderMaquette()],
          closeRequested: cancel,
          submitRequested: ok
        };
        dialogService.showDialog(dialog);
      });
    },
    hideDialog: () => {
      let dialog = dialogs.pop()!;
      if (dialog.exit) {
        dialog.exit();
      }
      projector.scheduleRender();
    },
    renderMaquette: () => {
      if (dialogs.length > 0) {
        return dialogs[dialogs.length-1].renderMaquette();
      }
      return undefined;
    }
  };
  return dialogService;
};