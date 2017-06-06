import { MaterialMaquetteServicesBase } from '../src/services';
import { Page } from '../src/router';
import { createCard } from '../src/components/card';
import { createTextfield } from '../src/components/textfield';
import { h } from 'maquette';
import {createList, ListItem} from "../src/components/list";

export let createListPage = (services: MaterialMaquetteServicesBase): Page => {

  let items: ListItem[] = [
    {
      key: 1,
      text: 'One'
    },
    {
      key: 2,
      text: 'Two'
    },
    {
      key: 3,
      text: 'Three'
    }
  ];

  let list1 = createList(services, {
    avatarList: false,
    getItems: () => items
  });

  let card1 = createCard({ shadowDp: 4, cellColumns: 12 });

  return {
    title: () => 'List',
    content: () => h('main', [
      card1.wrap([
        {
          type: 'primary',
          title: () => 'List'
        },
        {
          type: 'supportingText',
          content: () => [
            list1.renderMaquette()
          ]
        }
      ])
    ])
  };
};