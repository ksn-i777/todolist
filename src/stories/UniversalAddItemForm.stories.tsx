import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AddItemForm } from '../components/AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
    title: 'Example/AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>

const addItemFormCallback = action('Item form added item with title')

const baseArgs = {
    what: 'item form',
    callback: addItemFormCallback
}

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />

export const addItemFormExample = Template.bind({})
addItemFormExample.args = {
    ...baseArgs
}