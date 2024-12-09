'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { CopyIcon, Mail, Phone, User, ShieldCheck, Calendar } from 'lucide-react';
import { useClipboard } from 'use-clipboard-copy';
import { formatDate } from '@/lib/utils';
import { UserData } from '@/lib/utils';

type ViewEmployeeModalProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  employee: UserData | null;
};

export const ViewEmployeeModal = ({ open, onOpenChange, employee }: ViewEmployeeModalProps) => {
  const { fullName, email, phone, role, createdAt, avatarUrl } = employee || {};
  const clipboard = useClipboard();

  if (!employee) return null;

 
  const DetailRow = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: string;
    color: string;
  }) => (
    <>
      <hr className="my-4 border-gray-200" />
      <div className="flex justify-between">
        <div className='flex space-x-4'>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full bg-${color}-100`}
        >
          <Icon className={`w-5 h-5 text-${color}-400`} />
        </div>
        <div className='text-black100 text-sm'>
          <p className=" ">{label}</p>
          <p className=" font-semibold">{value}</p>
        </div>
        </div>
       
        <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <CopyIcon
        className="w-4 h-4 text-gray-400 cursor-pointer"
        onClick={() => clipboard.copy(value)}
      />
    </TooltipTrigger>
    <TooltipContent>
      <p>Copy {label}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


         

      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center p-4">Employee Details</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback>{fullName ? fullName[0] : 'N/A'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{fullName}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>

        <div className="mt-2 space-y-4">

          <DetailRow
            icon={User}
            label="Name"
            value={fullName || 'N/A'}
            color="purple"
          />

          <DetailRow
            icon={Mail}
            label="Email"
            value={email || 'N/A'}
            color="red"
          />

          {/* Phone */}
          <DetailRow
            icon={Phone}
            label="Phone"
            value={phone || 'N/A'}
            color="cyan"
          />

          {/* Role */}
          <DetailRow
            icon={ShieldCheck}
            label="Role"
            value={role || 'N/A'}
            color="green"
          />

          {/* Date Created */}
          <DetailRow
            icon={Calendar}
            label="Date Created"
            value={formatDate(createdAt || '')}
            color="blue"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
