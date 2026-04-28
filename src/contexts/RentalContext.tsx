import React, { createContext, useContext, ReactNode, useState } from 'react';
import { RentalRequest, RentalDamageAssessment } from '../data/types';
import { rentalRequests, damageAssessments } from '../data/mockData';
import { toast } from 'sonner';

interface RentalContextType {
  requests: RentalRequest[];
  damageAssessments: RentalDamageAssessment[];
  getRentalById: (id: string) => RentalRequest | undefined;
  submitRentalRequest: (request: RentalRequest) => void;
  updateRentalStatus: (id: string, status: RentalRequest['status']) => void;
  assignDeliveryPerson: (id: string, deliveryPerson: string) => void;
  createDamageAssessment: (assessment: RentalDamageAssessment) => void;
  getRentalsByStatus: (status: RentalRequest['status']) => RentalRequest[];
  getCompanyRentals: (companyName: string) => RentalRequest[];
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export function RentalProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<RentalRequest[]>(rentalRequests);
  const [assessments, setAssessments] = useState<RentalDamageAssessment[]>(
    damageAssessments
  );

  const getRentalById = (id: string): RentalRequest | undefined => {
    return requests.find((req) => req.id === id);
  };

  const submitRentalRequest = (request: RentalRequest) => {
    setRequests((prev) => [...prev, request]);
    toast.success('Rental request submitted successfully');
  };

  const updateRentalStatus = (id: string, status: RentalRequest['status']) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status,
              updatedAt: new Date()
            }
          : req
      )
    );
    toast.success(`Rental status updated to ${status}`);
  };

  const assignDeliveryPerson = (id: string, deliveryPerson: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              assignedDeliveryPerson: deliveryPerson,
              updatedAt: new Date()
            }
          : req
      )
    );
    toast.success(`Delivery person assigned: ${deliveryPerson}`);
  };

  const createDamageAssessment = (assessment: RentalDamageAssessment) => {
    setAssessments((prev) => [...prev, assessment]);
    updateRentalStatus(assessment.rentalRequestId, 'damage-assessed');
    toast.success('Damage assessment recorded');
  };

  const getRentalsByStatus = (status: RentalRequest['status']): RentalRequest[] => {
    return requests.filter((req) => req.status === status);
  };

  const getCompanyRentals = (companyName: string): RentalRequest[] => {
    return requests.filter((req) => req.companyName === companyName);
  };

  return (
    <RentalContext.Provider
      value={{
        requests,
        damageAssessments: assessments,
        getRentalById,
        submitRentalRequest,
        updateRentalStatus,
        assignDeliveryPerson,
        createDamageAssessment,
        getRentalsByStatus,
        getCompanyRentals
      }}
    >
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within RentalProvider');
  }
  return context;
}
