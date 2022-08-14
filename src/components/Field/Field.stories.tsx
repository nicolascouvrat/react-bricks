import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Field, TextFieldType, ISODateFieldType } from "./Field";

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
  valueType: TextFieldType,
};

export const Editable = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Editable.args = {
  value: "You can double click to edit me!",
  editable: true,
  valueType: TextFieldType,
  onEdit: (value) => console.log(value),
};

export const DateType = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DateType.args = {
  value: "2022-01-10",
  editable: true,
  valueType: ISODateFieldType,
  onEdit: (value) => console.log(value),
};
