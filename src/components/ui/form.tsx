"use client"

import { Children, cloneElement, createContext, useContext, useId } from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null)

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue | null>(null)

function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)

  if (!fieldContext || !itemContext) {
    throw new Error("useFormField must be used within <FormField> and <FormItem>")
  }

  const formContext = useFormContext()

  if (!formContext) {
    throw new Error("useFormField must be used within a <FormProvider>")
  }

  const { getFieldState, formState } = formContext
  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
    fieldState,
  }
}

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { id } = useFormField()

  return <Label htmlFor={id} className={cn(className)} {...props} />
}

function FormControl({ children }: { children: React.ReactNode }) {
  const { id, invalid, formItemId, formDescriptionId, formMessageId } = useFormField()

  const child = Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement>>

  return cloneElement(child, {
    ...child.props,
    id: child.props.id || id,
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid
      ? `${formDescriptionId} ${formMessageId}`
      : formDescriptionId,
  })
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { id, error } = useFormField()

  if (!error) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={`${id}-message`}
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {error.message}
    </p>
  )
}

export {
  useFormField,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
}
