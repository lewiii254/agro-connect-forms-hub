
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {/* Image container with improved responsive sizing */}
      <div className="w-full bg-gray-200" style={{ maxHeight: isMobile ? "200px" : "220px" }}>
        <AspectRatio ratio={isMobile ? 3/2 : 4/3} className="w-full">
          {member.image ? (
            <img 
              src={member.image} 
              alt={`${member.name}`} 
              className="object-cover w-full h-full"
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
      
      {/* Content section - improved visibility for mobile */}
      <div className="p-4 md:p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base md:text-xl font-bold text-agro-blue mb-1 break-words hyphens-auto">
            {member.name}
          </h3>
          <p className="text-agro-green font-semibold mb-2 md:mb-3 text-sm md:text-base">
            {member.position}
          </p>
          {!isMobile && (
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">
              {member.bio}
            </p>
          )}
          {isMobile && (
            <p className="text-gray-600 mb-3 text-xs">
              {member.bio.length > 100 ? `${member.bio.substring(0, 100)}...` : member.bio}
            </p>
          )}
        </div>
        
        {/* Contact icons */}
        <div className="flex space-x-3 md:space-x-4 mt-auto pt-3 justify-center">
          <ContactIcon href={member.contacts.facebook} label={`${member.name}'s Facebook`} className="hover:scale-110 transition-transform">
            <Facebook size={isMobile ? 18 : 20} />
          </ContactIcon>
          <ContactIcon href={member.contacts.instagram} label={`${member.name}'s Instagram`} className="hover:scale-110 transition-transform">
            <Instagram size={isMobile ? 18 : 20} />
          </ContactIcon>
          <ContactIcon href={member.contacts.email} label={`Email ${member.name}`} className="hover:scale-110 transition-transform">
            <Mail size={isMobile ? 18 : 20} />
          </ContactIcon>
          <ContactIcon href={member.contacts.whatsapp} label={`${member.name}'s WhatsApp`} className="hover:scale-110 transition-transform">
            <MessageCircle size={isMobile ? 18 : 20} />
          </ContactIcon>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
