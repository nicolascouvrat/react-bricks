import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Field from "./Field";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Field",
  component: Field,
} as ComponentMeta<typeof Field>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const NonEditable = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NonEditable.args = {
  value: "Hello world!",
  editable: false,
  valueType: "text",
};

export const Editable = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Editable.args = {
  value: "You can double click to edit me!",
  editable: true,
  valueType: "text",
};
