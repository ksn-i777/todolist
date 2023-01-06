import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from '../components/Task';
import {action} from '@storybook/addon-actions';
import {TaskPriority, TaskStatus} from '../api/api';

export default {
    title: 'Example/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const removeTaskCallback = action('Remove button inside Task was clicked')
const changeTaskTitleCallback = action('Title inside Task was changed')
const changeTaskStatusCallback = action('Status inside Task was changed')

const baseArgs = {
    removeTask: removeTaskCallback,
    changeTaskTitle: changeTaskTitleCallback,
    changeTaskStatus: changeTaskStatusCallback,
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const taskIsDoneExample = Template.bind({});
taskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'HTML&CSS', status: TaskStatus.Completed, completed: true, todoListId: 'todolistId1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
    todolistID: 'todolistId1'
};
export const taskIsNotDoneExample = Template.bind({});
taskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'HTML&CSS', status: TaskStatus.New, completed: false, todoListId: 'todolistId1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
    todolistID: 'todolistId1'
};