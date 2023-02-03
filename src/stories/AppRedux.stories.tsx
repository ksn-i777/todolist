import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AppRedux } from '../app/AppRedux'
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator'


export default {
    title: 'Example/AppWithRedux',
    component: AppRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppRedux>

const Template: ComponentStory<typeof AppRedux> = () => <AppRedux />

export const AppWithReduxExample = Template.bind({})