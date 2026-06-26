import type { ChangeEventHandler } from "react"
import { cn } from "@/lib/utils"

const inputClasses = "flex h-10 w-full rounded-xl bg-card border border-border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

interface FormFieldProps {
  id: string
  name: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  rows?: number
  className?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  disabled?: boolean
}

export function FormField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  rows,
  className,
  value,
  onChange,
  disabled,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(inputClasses, "min-h-[80px] resize-none", className)}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(inputClasses, className)}
        />
      )}
    </div>
  )
}
