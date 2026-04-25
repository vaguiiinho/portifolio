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
}

export function FormField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  rows,
  className
}: FormFieldProps) {
  const Component = rows ? "textarea" : "input"

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Component
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={cn(inputClasses, rows && "min-h-[80px] resize-none", className)}
      />
    </div>
  )
}