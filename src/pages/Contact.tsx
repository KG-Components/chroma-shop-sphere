
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-sircony to-sircony/80 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-center text-lg">
            We're here to help with any questions about our products or services.
            Reach out to our team for assistance.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Get in Touch</h2>
            <div className="h-1 w-20 bg-sircony mb-6"></div>
            <p className="text-gray-600 mb-8">
              We'd love to hear from you! Whether you have a question about our products, need technical assistance, or want to discuss a business opportunity, our team is ready to help.
            </p>

            <Card className="shadow-lg border-0 overflow-hidden mb-8">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-sircony/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-sircony" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Our Address</h3>
                      <p className="text-gray-600">
                        137 Cassava Residencial<br />
                        Via Expressa<br />
                        Luanda, Angola
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-sircony/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-sircony" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Us</h3>
                      <p className="text-gray-600">___________________</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-sircony/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-sircony" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Call Us</h3>
                      <p className="text-gray-600">+244 923 054 613</p>
                      <p className="text-gray-600">+244 921 191 402</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Business Hours</h2>
              <div className="h-1 w-20 bg-sircony mb-6"></div>
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-900">Monday - Friday:</span>
                      <span className="text-gray-700">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-900">Saturday:</span>
                      <span className="text-gray-700">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Sunday:</span>
                      <span className="text-gray-700">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Send Us a Message</h2>
            <div className="h-1 w-20 bg-sircony mb-6"></div>
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900 font-medium">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      disabled={isLoading}
                      className="border-gray-300 focus:border-sircony focus:ring-sircony"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                      disabled={isLoading}
                      className="border-gray-300 focus:border-sircony focus:ring-sircony"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-900 font-medium">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help you?"
                      required
                      disabled={isLoading}
                      className="border-gray-300 focus:border-sircony focus:ring-sircony"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-900 font-medium">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      rows={6}
                      required
                      disabled={isLoading}
                      className="border-gray-300 focus:border-sircony focus:ring-sircony resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-sircony hover:bg-sircony/90 text-white px-6 py-3 rounded-none transition"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Find Us</h2>
              <div className="h-1 w-20 bg-sircony mb-6"></div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map placeholder - Google Maps would be embedded here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
