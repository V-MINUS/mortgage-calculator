import MortgageCalculator from '@/components/mortgage-calculator'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Make Smarter Mortgage Decisions</h1>
            <p className="text-xl mb-8">Calculate the impact of overpayments on your mortgage and see how much you can save.</p>
            <div className="inline-flex items-center justify-center bg-white text-blue-800 rounded-full px-6 py-3 font-medium text-lg transition-all hover:bg-blue-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-2"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
              Scroll down to calculator
            </div>
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section className="py-16 bg-gray-50" id="calculator">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mortgage Overpayment Calculator</h2>
            <p className="text-lg text-gray-600">
              Our calculator helps you understand the impact of making additional payments on your mortgage.
              See how much interest you could save and how much faster you could be mortgage-free.
            </p>
          </div>
          
          <MortgageCalculator />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use Our Calculator?</h2>
            <p className="text-lg text-gray-600">
              Our calculator provides everything you need to make informed decisions about your mortgage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M12 8V7m0 1v8m-6-4h12" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Interest</h3>
              <p className="text-gray-600">See exactly how much interest you'll save by making overpayments on your mortgage.</p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reduce Term</h3>
              <p className="text-gray-600">Calculate how many years and months you can cut from your mortgage term.</p>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <path d="m12 9 .01 .01" />
                  <path d="M12 13v4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Informed Decisions</h3>
              <p className="text-gray-600">Compare weekly vs. monthly payments and see the impact of different overpayment strategies.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
