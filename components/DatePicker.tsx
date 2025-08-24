'use client'

import React from 'react'
import DatePicker from 'react-datepicker'
import { Calendar } from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerProps {
  selected: Date | null
  onChange: (date: Date | null) => void
  placeholderText?: string
  label?: string
  required?: boolean
  minDate?: Date
  maxDate?: Date
}

export default function CustomDatePicker({ 
  selected, 
  onChange, 
  placeholderText = "Pasirinkite datą",
  label,
  required = false,
  minDate,
  maxDate
}: DatePickerProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <DatePicker
          selected={selected}
          onChange={onChange}
          dateFormat="yyyy-MM-dd"
          placeholderText={placeholderText}
          minDate={minDate}
          maxDate={maxDate}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          popperClassName="z-50"
          popperPlacement="bottom-start"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          yearDropdownItemNumber={10}
          scrollableYearDropdown
        />
        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}
