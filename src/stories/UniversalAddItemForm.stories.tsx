import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {UniversalAddItemForm} from '../components/UniversalAddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Example/AddItemForm',
    component: UniversalAddItemForm,
} as ComponentMeta<typeof UniversalAddItemForm>;

const addItemFormCallback = action('Item form added item with title')

const baseArgs = {
    what: 'item form',
    callback: addItemFormCallback
}

const Template: ComponentStory<typeof UniversalAddItemForm> = (args) => <UniversalAddItemForm {...args} />;

export const addItemFormExample = Template.bind({});
addItemFormExample.args = {
    ...baseArgs
};