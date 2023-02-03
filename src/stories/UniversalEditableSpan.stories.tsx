import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { EditableSpan } from '../components/other/EditableSpan'
import { action } from '@storybook/addon-actions'

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>

const changeSpanTitleCallback = action('Title inside span was changed on')

const baseArgs = {
    spanTitle: 'Change me with double click',
    changeSpanTitle: changeSpanTitleCallback,
}

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />

export const changeSpanTitleExample = Template.bind({})
changeSpanTitleExample.args = {
    ...baseArgs,
}
