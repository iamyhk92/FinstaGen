using FinstaInfrastructure.Loans.Masters;
using FinstaInfrastructure.Settings;
using FinstaRepository.Interfaces.Settings;
using HelperManager;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace FinstaRepository.DataAccess.Settings
{
    public class SettingsDAL : ISettings
    {


        public List<SettingsDTO> lstlocations { get; set; }
        public List<SettingsDTO> lsttitles { get; set; }
        List<SettingsDTO> lstCompanyDetails { get; set; }
        List<SettingsDTO> lstApplicantypes { get; set; }


        public static string FormatDate(string strDate)
        {
            strDate = Convert.ToDateTime(strDate).ToString("dd-MM-yyyy");
            string Date = null;
            string[] dat = null;
            if (strDate != null)
            {
                if (strDate.Contains("/"))
                {
                    dat = strDate.Split('/');
                }
                else if (strDate.Contains("-"))
                {
                    dat = strDate.Split('-');
                }
                Date = dat[2] + "-" + dat[1] + "-" + dat[0];
            }
            return Date;
        }
        protected string ManageQuote(string str)
        {
            if (!string.IsNullOrEmpty(str))
            {
                str = str.Replace("'", "''");
            }
            return str;
        }

        protected int getStatusid(string name, string ConnectionString)
        {

            return Convert.ToInt32(NPGSqlHelper.ExecuteScalar(ConnectionString, CommandType.Text, "select statusid from tblmststatus where upper(statusname)='" + name.ToUpper() + "';"));
        }
        public List<SettingsDTO> getContacttitles(string ConnectionString)
        {
            lsttitles = new List<SettingsDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "SELECT titlename from tblmstcontacttitles;"))
                {
                    while (dr.Read())
                    {
                        SettingsDTO objtiltles = new SettingsDTO();
                        objtiltles.pTitleName = dr["titlename"].ToString();
                        lsttitles.Add(objtiltles);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return lsttitles;

        }


        public List<SettingsDTO> getCountries(string ConnectionString)
        {
            lstlocations = new List<SettingsDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "SELECT countryid,country from tblmstcountry order by country ;"))
                {
                    while (dr.Read())
                    {
                        SettingsDTO objcountries = new SettingsDTO();
                        objcountries.pCountry = dr["country"].ToString();
                        objcountries.pCountryId = Convert.ToInt32(dr["countryid"]);
                        lstlocations.Add(objcountries);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return lstlocations;

        }


        public List<SettingsDTO> getStates(string ConnectionString, int id)
        {
            lstlocations = new List<SettingsDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "SELECT stateid,state from tblmststate where countryid=" + id + " order by state;"))
                {
                    while (dr.Read())
                    {
                        SettingsDTO objstates = new SettingsDTO();
                        objstates.pState = dr["state"].ToString();
                        objstates.pStateId = Convert.ToInt32(dr["stateid"]);
                        lstlocations.Add(objstates);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return lstlocations;

        }


        public List<SettingsDTO> getDistricts(string ConnectionString, int id)
        {
            lstlocations = new List<SettingsDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "SELECT districtid,district from tblmstdistrict	 where stateid=" + id + " order by district;"))
                {
                    while (dr.Read())
                    {
                        SettingsDTO objDistricts = new SettingsDTO();
                        objDistricts.pDistrict = dr["district"].ToString();
                        objDistricts.pDistrictId = Convert.ToInt32(dr["districtid"]);
                        lstlocations.Add(objDistricts);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return lstlocations;

        }

        public List<SettingsDTO> getCompanyandbranchdetails(string ConnectionString)
        {
            lstCompanyDetails = new List<SettingsDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "SELECT enterprisecode, branchcode from(SELECT row_number() over(partition by companyid) as cid, enterprisecode from tblmstcompany) t1 join(SELECT row_number() over(partition by branchid) as bid, branchcode from tblmstbranch )t2  on t1.cid = t2.bid "))
                {
                    while (dr.Read())
                    {
                        SettingsDTO obj = new SettingsDTO();
                        obj.PEnterprisecode = dr["enterprisecode"].ToString();
                        obj.PBranchcode = dr["branchcode"].ToString();
                        lstCompanyDetails.Add(obj);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return lstCompanyDetails;

        }

        public List<SettingsDTO> getApplicanttypes(string contacttype, string ConnectionString)
        {
            lstApplicantypes = new List<SettingsDTO>();
            try
            {
                using (NpgsqlDataReader dr = NPGSqlHelper.ExecuteReader(ConnectionString, CommandType.Text, "select distinct applicanttype from TBLMSTAPPLICANTCONGIGURATION where statusid=1 order by applicanttype"))
                {
                    while (dr.Read())
                    {
                        SettingsDTO objapplicantypes = new SettingsDTO();
                        objapplicantypes.pApplicanttype = dr["applicanttype"].ToString();
                        lstApplicantypes.Add(objapplicantypes);
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return lstApplicantypes;

        }

 


    }
}
