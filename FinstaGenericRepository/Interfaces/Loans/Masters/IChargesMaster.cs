using FinstaInfrastructure.Loans.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinstaRepository.Interfaces.Loans.Masters
{
   public interface IChargesMaster
    {
        bool SaveChargesName(ChargesMasterDTO Charges, string ConnectionString);
        List<ChargesMasterDTO> GetChargesName(string ConnectionString);
        bool SaveLoanWiseChargeTypes(ChargesMasterDTO Charges, string ConnectionString);
        List<ChargesMasterDTO> GetLoanchargetypes(string ConnectionString);
        bool SaveLoanWiseChargeConfig(ChargesMasterDTO Charges, string ConnectionString);

    }
}
