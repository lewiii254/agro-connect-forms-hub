
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {/* Image container with fixed height */}
      <div className="h-48 bg-gray-200">
        <AspectRatio ratio={1 / 1} className="h-full">
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
      
      {/* Content section */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-agro-blue mb-1">{member.name}</h3>
          <p className="text-agro-green font-medium mb-3">{member.position}</p>
          <p className="text-gray-600 mb-4 text-sm">
            {member.bio}
          </p>
        </div>
        
        {/* Contact icons */}
        <div className="flex space-x-4 mt-3 justify-center">
          <ContactIcon href={member.contacts.facebook} label={`${member.name}'s Facebook`} className="hover:scale-110 transition-transform">
            <Facebook size={20} />
          </ContactIcon>
          <ContactIcon href={member.contacts.instagram} label={`${member.name}'s Instagram`} className="hover:scale-110 transition-transform">
            <Instagram size={20} />
          </ContactIcon>
          <ContactIcon href={member.contacts.email} label={`Email ${member.name}`} className="hover:scale-110 transition-transform">
            <Mail size={20} />
          </ContactIcon>
          <ContactIcon href={member.contacts.whatsapp} label={`${member.name}'s WhatsApp`} className="hover:scale-110 transition-transform">
            <MessageCircle size={20} />
          </ContactIcon>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
