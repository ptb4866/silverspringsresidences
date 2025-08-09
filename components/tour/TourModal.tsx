"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X, CalendarIcon, MapPin, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, isWeekend, isBefore, startOfDay } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useTourModal } from "@/hooks/use-tour-modal"

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[+]?[1-9][\d]{0,15}$|^[$$]?[\d]{3}[$$]?[\s-]?[\d]{3}[\s-]?[\d]{4}$/, {
      message: "Please enter a valid phone number",
    }),
  relationship: z.string().min(1, { message: "Please select your relationship" }),
  location: z.string().min(1, { message: "Please select a location" }),
  date: z.date({ required_error: "Please select a date" }),
  timeSlot: z.string().min(1, { message: "Please select a time slot" }),
  groupSize: z.string().min(1, { message: "Please select group size" }),
  interests: z.array(z.string()).optional(),
  specialRequests: z.string().optional(),
  marketingConsent: z.boolean().default(false),
})

type FormData = z.infer<typeof formSchema>

const timeSlots = [
  { value: "9:00", label: "9:00 AM", available: true },
  { value: "10:00", label: "10:00 AM", available: true },
  { value: "11:00", label: "11:00 AM", available: false },
  { value: "1:00", label: "1:00 PM", available: true },
  { value: "2:00", label: "2:00 PM", available: true },
  { value: "3:00", label: "3:00 PM", available: true },
  { value: "4:00", label: "4:00 PM", available: true },
]

const interestOptions = [
  "Memory Care Services",
  "Dining Options",
  "Activities & Recreation",
  "Healthcare Services",
  "Room Layouts",
  "Pricing Information",
  "Move-in Process",
  "Pet Policy",
]

export default function TourModal() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [canProceedToNextStep, setCanProceedToNextStep] = useState(false)
  const { toast } = useToast()
  const { isOpen, closeTourModal } = useTourModal()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      relationship: "",
      location: "",
      timeSlot: "",
      groupSize: "",
      interests: [],
      specialRequests: "",
      marketingConsent: false,
    },
  })

  const {
    watch,
    formState: { errors, isValid },
  } = form

  // Watch all form values for real-time validation
  const watchedValues = watch()

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      form.reset()
      setStep(1)
      setSelectedDate(undefined)
      setCanProceedToNextStep(false)
    }
  }, [isOpen, form])

  // Check if current step can proceed to next step
  useEffect(() => {
    const checkStepValidation = () => {
      switch (step) {
        case 1:
          // Step 1: Personal Information
          const step1Valid =
            watchedValues.firstName &&
            watchedValues.firstName.length >= 2 &&
            watchedValues.lastName &&
            watchedValues.lastName.length >= 2 &&
            watchedValues.email &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedValues.email) &&
            watchedValues.phone &&
            watchedValues.phone.length >= 10 &&
            watchedValues.relationship &&
            !errors.firstName &&
            !errors.lastName &&
            !errors.email &&
            !errors.phone &&
            !errors.relationship

          setCanProceedToNextStep(step1Valid)
          break

        case 2:
          // Step 2: Tour Details
          const step2Valid =
            watchedValues.location &&
            watchedValues.date &&
            watchedValues.timeSlot &&
            watchedValues.groupSize &&
            !errors.location &&
            !errors.date &&
            !errors.timeSlot &&
            !errors.groupSize

          setCanProceedToNextStep(step2Valid)
          break

        case 3:
          // Step 3: Always allow submission (no required fields)
          setCanProceedToNextStep(true)
          break

        default:
          setCanProceedToNextStep(false)
      }
    }

    checkStepValidation()
  }, [watchedValues, errors, step])

  // Disable past dates and weekends
  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date())
    return isBefore(date, today) || isWeekend(date)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      form.setValue("date", date, { shouldValidate: true })
    }
  }

  const nextStep = () => {
    if (step < 3 && canProceedToNextStep) {
      setStep(step + 1)
      setCanProceedToNextStep(false) // Reset for next step
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setCanProceedToNextStep(false) // Will be recalculated by useEffect
    }
  }

  async function onSubmit(values: FormData) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Tour scheduled:", values)

      const confirmationData = {
        ...values,
        confirmationNumber: `SSR-${Date.now()}`,
        tourDate: format(values.date, "EEEE, MMMM do, yyyy"),
        tourTime: timeSlots.find((slot) => slot.value === values.timeSlot)?.label,
      }

      toast({
        title: "Tour Scheduled Successfully!",
        description: `Confirmation #${confirmationData.confirmationNumber}. Check your email for details.`,
      })

      closeTourModal()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem scheduling your tour. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get step completion status
  const getStepStatus = (stepNumber: number) => {
    if (step > stepNumber) return "completed"
    if (step === stepNumber) return "current"
    return "upcoming"
  }

  // Get required fields count for current step
  const getRequiredFieldsInfo = () => {
    switch (step) {
      case 1:
        const step1Fields = ["firstName", "lastName", "email", "phone", "relationship"]
        const step1Completed = step1Fields.filter((field) => {
          const value = watchedValues[field as keyof FormData]
          const hasError = errors[field as keyof FormData]
          return value && !hasError
        }).length
        return { completed: step1Completed, total: step1Fields.length }

      case 2:
        const step2Fields = ["location", "date", "timeSlot", "groupSize"]
        const step2Completed = step2Fields.filter((field) => {
          const value = watchedValues[field as keyof FormData]
          const hasError = errors[field as keyof FormData]
          return value && !hasError
        }).length
        return { completed: step2Completed, total: step2Fields.length }

      case 3:
        return { completed: 1, total: 1 } // No required fields in step 3

      default:
        return { completed: 0, total: 0 }
    }
  }

  if (!isOpen) return null

  const requiredFieldsInfo = getRequiredFieldsInfo()

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeTourModal} />

      {/* Modal */}
      <div className="relative ml-auto w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Schedule Your Tour</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Step {step} of 3</span>
              {step < 3 && (
                <>
                  <span>•</span>
                  <span
                    className={cn(
                      "flex items-center space-x-1",
                      canProceedToNextStep ? "text-green-600" : "text-amber-600",
                    )}
                  >
                    {canProceedToNextStep ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>
                      {requiredFieldsInfo.completed}/{requiredFieldsInfo.total} fields completed
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
          <button onClick={closeTourModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-3 bg-gray-50">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center flex-1">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    getStepStatus(stepNumber) === "completed"
                      ? "bg-green-600 text-white"
                      : getStepStatus(stepNumber) === "current"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600",
                  )}
                >
                  {getStepStatus(stepNumber) === "completed" ? <CheckCircle size={16} /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={cn(
                      "flex-1 h-1 mx-2 transition-all",
                      getStepStatus(stepNumber) === "completed" ? "bg-green-600" : "bg-gray-200",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span className={step === 1 ? "font-medium text-blue-600" : ""}>Personal Info</span>
            <span className={step === 2 ? "font-medium text-blue-600" : ""}>Tour Details</span>
            <span className={step === 3 ? "font-medium text-blue-600" : ""}>Preferences</span>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                    <p className="text-gray-600 mb-6">
                      Let us know who you are so we can personalize your tour experience.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                      <p className="text-sm text-blue-800">
                        <strong>Required:</strong> All fields marked with * must be completed to continue.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            First Name *
                            {watchedValues.firstName && !errors.firstName && (
                              <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className={cn(
                                errors.firstName
                                  ? "border-red-500 focus:border-red-500"
                                  : watchedValues.firstName && !errors.firstName
                                    ? "border-green-500"
                                    : "",
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            Last Name *
                            {watchedValues.lastName && !errors.lastName && (
                              <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              {...field}
                              className={cn(
                                errors.lastName
                                  ? "border-red-500 focus:border-red-500"
                                  : watchedValues.lastName && !errors.lastName
                                    ? "border-green-500"
                                    : "",
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Email Address *
                          {watchedValues.email && !errors.email && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            type="email"
                            {...field}
                            className={cn(
                              errors.email
                                ? "border-red-500 focus:border-red-500"
                                : watchedValues.email && !errors.email
                                  ? "border-green-500"
                                  : "",
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Phone Number *
                          {watchedValues.phone && !errors.phone && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 123-4567"
                            {...field}
                            className={cn(
                              errors.phone
                                ? "border-red-500 focus:border-red-500"
                                : watchedValues.phone && !errors.phone
                                  ? "border-green-500"
                                  : "",
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Your Relationship to Potential Resident *
                          {watchedValues.relationship && !errors.relationship && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                          )}
                        </FormLabel>
                        <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                errors.relationship
                                  ? "border-red-500 focus:border-red-500"
                                  : watchedValues.relationship && !errors.relationship
                                    ? "border-green-500"
                                    : "",
                              )}
                            >
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="self">I am the potential resident</SelectItem>
                            <SelectItem value="spouse">Spouse/Partner</SelectItem>
                            <SelectItem value="child">Adult Child</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="advisor">Professional Advisor</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Tour Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tour Details</h3>
                    <p className="text-gray-600 mb-6">Choose your preferred location, date, and time for the tour.</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                      <p className="text-sm text-blue-800">
                        <strong>Required:</strong> Please select all tour details to proceed.
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Location to Tour *
                          {watchedValues.location && !errors.location && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                          )}
                        </FormLabel>
                        <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                errors.location
                                  ? "border-red-500 focus:border-red-500"
                                  : watchedValues.location && !errors.location
                                    ? "border-green-500"
                                    : "",
                              )}
                            >
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="maple">
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-2" />
                                <div>
                                  <div className="font-medium">Maple House</div>
                                  <div className="text-sm text-gray-500">123 Silver Springs Lane</div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="willow">
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-2" />
                                <div>
                                  <div className="font-medium">Willow House</div>
                                  <div className="text-sm text-gray-500">456 Silver Springs Circle</div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="both">Both Locations (Extended Tour)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center">
                          Preferred Date *
                          {watchedValues.date && !errors.date && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                          )}
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                  errors.date
                                    ? "border-red-500 focus:border-red-500"
                                    : watchedValues.date && !errors.date
                                      ? "border-green-500"
                                      : "",
                                )}
                              >
                                {field.value ? format(field.value, "EEEE, MMMM do, yyyy") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={handleDateSelect}
                              disabled={isDateDisabled}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <p className="text-sm text-gray-500">Tours are available Monday through Friday</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Preferred Time *
                          {watchedValues.timeSlot && !errors.timeSlot && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                          )}
                        </FormLabel>
                        <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                errors.timeSlot
                                  ? "border-red-500 focus:border-red-500"
                                  : watchedValues.timeSlot && !errors.timeSlot
                                    ? "border-green-500"
                                    : "",
                              )}
                            >
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot.value} value={slot.value} disabled={!slot.available}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{slot.label}</span>
                                  {!slot.available && <span className="text-red-500 text-xs ml-2">Unavailable</span>}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="groupSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Group Size *
                          {watchedValues.groupSize && !errors.groupSize && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                          )}
                        </FormLabel>
                        <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                errors.groupSize
                                  ? "border-red-500 focus:border-red-500"
                                  : watchedValues.groupSize && !errors.groupSize
                                    ? "border-green-500"
                                    : "",
                              )}
                            >
                              <SelectValue placeholder="How many people will attend?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Just me</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="3">3 people</SelectItem>
                            <SelectItem value="4">4 people</SelectItem>
                            <SelectItem value="5+">5 or more people</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Preferences & Special Requests */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tour Preferences</h3>
                    <p className="text-gray-600 mb-6">
                      Help us customize your tour by letting us know what interests you most.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                      <p className="text-sm text-green-800">
                        <strong>Optional:</strong> These preferences help us personalize your tour experience.
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">What would you like to focus on during your tour?</FormLabel>
                          <p className="text-sm text-gray-500">Select all that apply</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {interestOptions.map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests or Questions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific questions, accessibility needs, or special requests for your tour?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marketingConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm cursor-pointer">
                            Stay informed about Silver Springs Residency
                          </FormLabel>
                          <p className="text-xs text-gray-500">
                            I would like to receive updates about events, news, and information about Silver Springs
                            Residency via email.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </form>
          </Form>
        </div>

        {/* Footer - Fixed */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-4">
          {/* Navigation Buttons */}
          <div className="flex justify-between mb-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className={step === 1 ? "invisible" : ""}
            >
              Previous
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceedToNextStep}
                className={cn(
                  "transition-all",
                  canProceedToNextStep
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-300 cursor-not-allowed hover:bg-gray-300",
                )}
              >
                {canProceedToNextStep
                  ? "Next Step"
                  : `Complete ${requiredFieldsInfo.total - requiredFieldsInfo.completed} more field${requiredFieldsInfo.total - requiredFieldsInfo.completed !== 1 ? "s" : ""}`}
              </Button>
            ) : (
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scheduling...
                  </div>
                ) : (
                  "Schedule My Tour"
                )}
              </Button>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <a href="tel:+15551234567" className="hover:text-green-600">
                (555) 123-4567
              </a>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <a href="mailto:tours@silversprings.com" className="hover:text-green-600">
                tours@silversprings.com
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            Questions? Our tour coordinators are available Monday-Friday, 9AM-5PM
          </p>
        </div>
      </div>
    </div>
  )
}
