﻿using FinstaInfrastructure.Loans.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinstaRepository.Interfaces.Loans.Masters
{
    public interface ILoansMaster
    {
        //bool SaveInstamentdate(LoansMasterDTO Instamentdates);
     //   bool UpdateInstalmentdates(LoansMasterDTO Instamentdates);

        //List<LoansMasterDTO> getinstalmentsdateslist(string ConnectionString);
        List<LoansMasterDTO> getLoanTypes(string ConnectionString);


        List<loanconfigurationDTO> getLoanpayins(string ConnectionString);

        List<loanconfigurationDTO> getLoanInterestratetypes(string ConnectionString);

        List<LoansMasterDTO> getLoanMasterDetails(string ConnectionString);

        bool saveLoanMaster(LoansMasterDTO loanmasterlist, string con);
        bool updateLoanMaster(LoansMasterDTO loanmasterlist, string con);

        bool DeleteLoanMaster(Int64 loanid, int modifiedby, string con);
        int checkInsertLoanNameandCodeDuplicates(string checkparamtype,string loanname, string loancode, string con);
    }
}
