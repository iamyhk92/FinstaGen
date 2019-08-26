using FinstaInfrastructure.Loans.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinstaInfrastructure
{
    public class CommonDTO
    {
        public int createdby = 1;
        public int pCreatedby
        {
            get
            {
                return createdby;
            }
            set
            {
                createdby = 1;
            }
        }

        public DateTime? pCreateddate { get; set; }

        public int pModifiedby { get; set; }
        public DateTime? pModifieddate { get; set; }

        public string pStatusid { get; set; }

        public string pStatusname { get; set; }

        public DateTime? pEffectfromdate { get; set; }

        public DateTime? pEffecttodate { get; set; }

      

    }
}
