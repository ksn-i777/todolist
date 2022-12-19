import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {UniversalEditableSpan} from '../components/UniversalEditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Example/EditableSpan',
    component: UniversalEditableSpan,
} as ComponentMeta<typeof UniversalEditableSpan>;

const changeSpanTitleCallback = action('Title inside span was changed on')

const baseArgs = {
    spanTitle: 'Change me with double click',
    changeSpanTitle: changeSpanTitleCallback,
}

const Template: ComponentStory<typeof UniversalEditableSpan> = (args) => <UniversalEditableSpan {...args} />;

export const changeSpanTitleExample = Template.bind({});
changeSpanTitleExample.args = {
    ...baseArgs,
   };
