
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Phone, CreditCard, Banknote } from "lucide-react";

const PaymentDetails = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-agro-blue mb-4">Payment Details</h2>
          <div className="w-24 h-1 bg-agro-orange mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Use any of the following payment methods to complete your application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Co-operative Bank Card */}
          <Card className="overflow-hidden border-2 border-agro-blue/20 hover:border-agro-blue/40 transition-all shadow-lg">
            <CardHeader className="bg-gradient-to-r from-agro-blue/90 to-agro-blue pb-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-white" />
                <CardTitle className="text-white text-xl">Co-operative Bank Transfer</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <div className="font-semibold text-agro-blue text-lg md:w-1/3">Account Name:</div>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 font-medium flex-1">
                    ERICS-NEXAS
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <div className="font-semibold text-agro-blue text-lg md:w-1/3">Account Number:</div>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 font-mono text-lg flex-1">
                    01108578417001
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <div className="font-semibold text-agro-blue text-lg md:w-1/3">Bank:</div>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 flex-1">
                    Co-operative Bank of Kenya
                  </div>
                </div>
                
                <div className="bg-sky-50 border-l-4 border-sky-500 p-4 text-sky-700">
                  <p className="font-medium">Please include your full name and application type as reference.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* M-Pesa Card */}
          <Card className="overflow-hidden border-2 border-agro-green/20 hover:border-agro-green/40 transition-all shadow-lg">
            <CardHeader className="bg-gradient-to-r from-agro-green/90 to-agro-green pb-4">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-white" />
                <CardTitle className="text-white text-xl">M-Pesa Payment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <div className="font-semibold text-agro-green text-lg">Business Number:</div>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 font-mono text-xl text-center">
                          400200
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="font-semibold text-agro-green text-lg">Account Number:</div>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 font-mono text-xl text-center">
                          854673
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <AspectRatio ratio={4/3} className="bg-gray-100">
                        <img 
                          src="/lovable-uploads/962c05c7-4840-4936-8799-42c13caf386e.png" 
                          alt="M-Pesa PayBill Details" 
                          className="object-contain w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
                  <p className="font-medium">Follow the M-Pesa PayBill instructions and use your full name as the account reference.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Payment Instructions */}
        <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Banknote className="h-6 w-6 text-agro-orange" />
            <h3 className="text-xl font-bold text-agro-blue">Payment Instructions</h3>
          </div>
          <ol className="list-decimal pl-5 space-y-3 text-gray-700">
            <li>Select your preferred payment method from the options above.</li>
            <li>Complete the payment using the provided account details.</li>
            <li>Include your <span className="font-medium">full name and application type</span> as reference.</li>
            <li>After payment, you may be required to submit your payment receipt or transaction number when requested.</li>
            <li>For any payment issues or inquiries, please contact our support team at <a href="mailto:support@agro-nexus.com" className="text-agro-blue underline">support@agro-nexus.com</a>.</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default PaymentDetails;
