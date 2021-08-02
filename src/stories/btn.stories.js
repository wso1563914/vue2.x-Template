import Btn from './btn.vue';

export default {
    component: Btn,
    title: 'DIY/Btn',
    argTypes: {
        // name: { control: 'input' },
    },
};

const Template = (args, { argTypes }) => {
    return {
        components: { Btn },
        props: Object.keys(argTypes),
        template: '<Btn name="default按钮" v-bind="$props" @onClick="onClick"/>',
    };
};

export const DefaultBtn = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
    type: 'primary',
    name: 'primary按钮',
};
