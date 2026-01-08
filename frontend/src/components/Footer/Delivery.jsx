import React from 'react'

const Delivery = () => {
  return (
    <div>
      <section class="bg-gradient-to-br from-blue-50 to-white py-16 px-6">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
      🏥 Delivery Policy
    </h2>
    <p class="text-gray-600 text-lg mb-10">
      At <span class="font-semibold text-blue-600">Doctor Booking App</span>, we ensure that
      all prescriptions, medical reports, and health documents are delivered
      securely and on time to maintain your convenience and trust.
    </p>

    <div class="grid md:grid-cols-3 gap-8">
      {/* <!-- Card 1 --> */}
      <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-500 hover:shadow-2xl transition-all duration-300">
        <div class="text-blue-600 text-4xl mb-4">📄</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Prescription Delivery</h3>
        <p class="text-gray-600 text-sm">
          Your doctor’s prescriptions are safely sent to your registered account
          or via email after appointment confirmation.
        </p>
      </div>

      {/* <!-- Card 2 --> */}
      <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-green-500 hover:shadow-2xl transition-all duration-300">
        <div class="text-green-600 text-4xl mb-4">🧾</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Report Delivery</h3>
        <p class="text-gray-600 text-sm">
          Lab and test reports are digitally delivered with end-to-end
          encryption to ensure patient confidentiality.
        </p>
      </div>

      {/* <!-- Card 3 --> */}
      <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-purple-500 hover:shadow-2xl transition-all duration-300">
        <div class="text-purple-600 text-4xl mb-4">💊</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Medicine Delivery</h3>
        <p class="text-gray-600 text-sm">
          Partner pharmacies deliver authentic medicines to your doorstep
          within the promised time frame.
        </p>
      </div>
    </div>

    <div class="mt-12 text-gray-600">
      <p>
        For more details or delivery support, please contact us at
        <a href="mailto:support@doctorbookingapp.com" class="text-blue-600 font-medium hover:underline">
          &nbsp; support@aroggolink.com
        </a>
      </p>
    </div>
  </div>
</section>

    </div>
  )
}

export default Delivery