"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function MortgageCalculator() {
  const [mortgageAmount, setMortgageAmount] = React.useState(350000)
  const [overpaymentPercent, setOverpaymentPercent] = React.useState(100)
  const [overpaymentYears, setOverpaymentYears] = React.useState(5)
  const [termYears, setTermYears] = React.useState(20)
  const [deposit, setDeposit] = React.useState(30000)
  const [paymentFrequency, setPaymentFrequency] = React.useState('monthly') // 'monthly' or 'weekly'

  const rate_annual = 0.031

  const calculateMortgage = () => {
    // Loan amount is mortgageAmount minus deposit
    const loanAmount = mortgageAmount - deposit
    if (loanAmount <= 0) {
      return {
        years: 0,
        rem_months: 0,
        total_paid: 0,
        interest_paid: 0,
        interest_saved: 0,
        payment_amount: 0,
        overpay_amount: 0,
        standard_total: 0,
        standard_interest: 0,
        loanAmount: 0
      }
    }

    let r_period, n_periods, periods_per_year
    
    if (paymentFrequency === 'weekly') {
      periods_per_year = 52
      r_period = rate_annual / periods_per_year
      n_periods = termYears * periods_per_year
    } else {
      periods_per_year = 12
      r_period = rate_annual / periods_per_year
      n_periods = termYears * periods_per_year
    }

    // Standard payment
    const payment_standard = loanAmount * r_period / (1 - Math.pow(1 + r_period, -n_periods))

    // Maximum allowed overpayment per year (10% of original loan)
    const max_overpay_per_year = 0.10 * loanAmount
    const actual_overpay_per_year = max_overpay_per_year * (overpaymentPercent / 100)
    const overpay_per_period = actual_overpay_per_year / periods_per_year

    // Amortization with overpayments
    let principal = loanAmount
    let periods = 0
    let total_paid = 0

    while (principal > 0.01 && periods < 2000) {
      const interest = principal * r_period
      let payment_total

      // Apply overpayments only for the specified years
      if (periods < overpaymentYears * periods_per_year) {
        payment_total = payment_standard + overpay_per_period
      } else {
        payment_total = payment_standard
      }

      const principal_payment = payment_total - interest

      if (principal_payment <= 0) break

      if (principal_payment >= principal) {
        // Final payment
        total_paid += principal + interest
        principal = 0
      } else {
        principal -= principal_payment
        total_paid += payment_total
      }

      periods++
    }

    const years = Math.floor(periods / periods_per_year)
    const rem_periods = periods % periods_per_year
    const rem_months = paymentFrequency === 'weekly' ? Math.round(rem_periods / 4.33) : rem_periods
    const interest_paid = total_paid - loanAmount

    // Calculate standard mortgage for comparison
    const standard_total = payment_standard * (termYears * periods_per_year)
    const standard_interest = standard_total - loanAmount
    const interest_saved = standard_interest - interest_paid

    return {
      years,
      rem_months,
      total_paid,
      interest_paid,
      interest_saved,
      payment_amount: payment_standard,
      overpay_amount: overpay_per_period,
      standard_total,
      standard_interest,
      loanAmount
    }
  }

  const results = calculateMortgage()

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getFrequencyText = () => {
    return paymentFrequency === 'weekly' ? 'Weekly' : 'Monthly'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Mortgage Overpayment Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Settings</h2>

            {/* Payment Frequency Toggle */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Frequency
              </Label>
              <ToggleGroup 
                type="single" 
                value={paymentFrequency}
                onValueChange={(value) => value && setPaymentFrequency(value)}
              >
                <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
                <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Property Price */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Property Price: {formatCurrency(mortgageAmount)}
              </Label>
              <Slider
                min={100000}
                max={600000}
                step={10000}
                value={[mortgageAmount]}
                onValueChange={(value) => setMortgageAmount(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>€100k</span>
                <span>€600k</span>
              </div>
            </div>

            {/* Deposit */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Deposit: {formatCurrency(deposit)}
              </Label>
              <Slider
                min={0}
                max={mortgageAmount - 10000}
                step={1000}
                value={[deposit]}
                onValueChange={(value) => setDeposit(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>€0</span>
                <span>{formatCurrency(mortgageAmount - 10000)}</span>
              </div>
            </div>

            {/* Mortgage Term */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Mortgage Term: {termYears} years
              </Label>
              <Slider
                min={5}
                max={35}
                step={1}
                value={[termYears]}
                onValueChange={(value) => setTermYears(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 years</span>
                <span>35 years</span>
              </div>
            </div>

            {/* Overpayment Percentage */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Overpayment: {overpaymentPercent}% of max allowed (€{results.loanAmount > 0 ? Math.round(results.loanAmount * 0.10 * overpaymentPercent / 100 / (paymentFrequency === 'weekly' ? 52 : 12)) : 0}/{paymentFrequency === 'weekly' ? 'week' : 'month'})
              </Label>
              <Slider
                min={0}
                max={100}
                step={5}
                value={[overpaymentPercent]}
                onValueChange={(value) => setOverpaymentPercent(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Overpayment Years */}
            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Overpayments: {overpaymentYears} years
              </Label>
              <Slider
                min={1}
                max={termYears}
                step={1}
                value={[overpaymentYears]}
                onValueChange={(value) => setOverpaymentYears(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 year</span>
                <span>{termYears} years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Results ({getFrequencyText()} Payments)</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Payoff Time:</span>
                <span className="text-green-700 font-bold">
                  {results.years} years {results.rem_months} months
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Total Paid:</span>
                <span>{formatCurrency(results.total_paid)}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Total Interest:</span>
                <span>{formatCurrency(results.interest_paid)}</span>
              </div>

              <div className="flex justify-between border-t pt-2">
                <span className="font-medium text-green-700">Interest Saved:</span>
                <span className="text-green-700 font-bold">
                  {formatCurrency(results.interest_saved)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">Payment Breakdown</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Standard {getFrequencyText()} Payment:</span>
                <span>{formatCurrency(results.payment_amount)}</span>
              </div>

              <div className="flex justify-between">
                <span>Additional {getFrequencyText()} Payment:</span>
                <span>{formatCurrency(results.overpay_amount)}</span>
              </div>

              <div className="flex justify-between font-medium border-t pt-2">
                <span>Total {getFrequencyText()} Payment:</span>
                <span>{formatCurrency(results.payment_amount + results.overpay_amount)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Standard Term Comparison</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Standard Total Paid:</span>
                <span>{formatCurrency(results.standard_total)}</span>
              </div>

              <div className="flex justify-between">
                <span>Standard Interest:</span>
                <span>{formatCurrency(results.standard_interest)}</span>
              </div>

              <div className="flex justify-between text-green-600 font-medium">
                <span>Time Saved:</span>
                <span>{termYears - results.years} years {12 - results.rem_months} months</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This calculator assumes a fixed rate of 3.1% (Bank of Ireland's current best first-time buyer rate). 
          Bank of Ireland allows up to 10% overpayments per year on fixed-rate mortgages without penalty. 
          Weekly payments can reduce interest due to more frequent compounding. Always check current terms with your lender.
        </p>
      </div>
    </div>
  )
}
