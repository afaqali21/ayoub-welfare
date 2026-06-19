import whatsappIcon from "@/assets/whatsapp-icon.png";

export function WhatsAppWidget() {
  const phoneNumber = "447735587787";
  const message = "Hello! I'm interested in learning more about Ayoub Welfare.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      title="Chat with us on WhatsApp"
    >
      <img src={whatsappIcon} alt="WhatsApp" className="h-7 w-7" />
    </a>
  );
}
