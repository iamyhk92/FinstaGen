using FinstaInfrastructure.Loans.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinstaInfrastructure.Settings
{
    public class SettingsDTO : CommonDTO
    {
        public string pCountry { get; set; }
        public int pCountryId { get; set; }

        public string pState { get; set; }
        public int pStateId { get; set; }

        public string pDistrict { get; set; }
        public int pDistrictId { get; set; }

        public string pTitleName { get; set; }

        public string PEnterprisecode { get; set; }

        public string PBranchcode { get; set; }

        public string pApplicanttype { get; set; }

    }
}
