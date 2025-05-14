
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";

// Type definition for team member data
export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  contacts: {
    facebook: string;
    instagram: string;
    email: string;
    whatsapp: string;
  };
  image?: string;
}

// Contact icon component for consistent styling
const ContactIcon = ({ 
  children, 
  href, 
  label, 
  className = "" 
}: { 
  children: React.ReactNode; 
  href: string; 
  label: string; 
  className?: string 
}) => (
  <a 
    href={href} 
    aria-label={label}
    className={`text-agro-blue hover:text-agro-green transition-colors ${className}`}
    target="_blank" 
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const isMobile = useIsMobile();
  
  // Function to truncate bio text based on screen size
  const truncateBio = (text: string) => {
    if (isMobile) {
      return text.length > 85 ? `${text.substring(0, 85)}...` : text;
    }
    return text.length > 120 ? `${text.substring(0, 120)}...` : text;
  };

  return (
    <Card className="h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image container with improved responsive sizing */}
      <div className="w-full bg-gray-100">
        <AspectRatio ratio={4/3} className="w-full">
          {member.image ? (
            <img 
              src={member.image} 
              alt={`${member.name}`} 
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl font-bold text-agro-blue">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </AspectRatio>
      </div>
      
      <CardContent className="p-4 flex flex-col gap-2">
        {/* Name with better visibility */}
        <h3 className="font-bold text-agro-blue text-lg md:text-xl break-words hyphens-auto">
          {member.name}
        </h3>
        
        {/* Position with better contrast */}
        <p className="text-agro-green font-semibold text-sm md:text-base">
          {member.position}
        </p>
        
        {/* Bio with better readability */}
        <p className="text-gray-700 mt-1 mb-3 text-sm leading-relaxed">
          {truncateBio(member.bio)}
        </p>
        
        {/* Contact icons with improved spacing */}
        <div className="flex justify-center space-x-4 mt-auto pt-2">
          <ContactIcon href={member.contacts.facebook} label={`${member.name}'s Facebook`} className="hover:scale-110 transition-transform">
            <Facebook size={20} />
          </ContactIcon>
          <ContactIcon href={member.contacts.instagram} label={`${member.name}'s Instagram`} className="hover:scale-110 transition-transform">
            <Instagram size={20} />
          </ContactIcon>
          <ContactIcon href={`mailto:${member.contacts.email}`} label={`Email ${member.name}`} className="hover:scale-110 transition-transform">
            <Mail size={20} />
          </ContactIcon>
          <ContactIcon href={member.contacts.whatsapp} label={`${member.name}'s WhatsApp`} className="hover:scale-110 transition-transform">
            <MessageCircle size={20} />
          </ContactIcon>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
