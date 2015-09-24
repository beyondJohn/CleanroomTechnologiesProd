using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace CleanroomTechnologiesProd
{
    public class addProductTypeToJSONFiles
    {
        public void addAttribute()
        {
            List<productJSON> Items = new List<productJSON>();
            var serializer = new JavaScriptSerializer();
            string json = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("~/JSON/BioSafetyCabinets.json"));
            var deserialize = serializer.Deserialize<List<productJSON>>(json);
            foreach (productJSON item in deserialize)
            {
                List<string> types = new List<string>();
                foreach (string type in item.Type)
                {
                    types.Add(type);
                }
                List<string> myCategory = new List<string>();
                myCategory.Add("Biological Safety Cabinets");
                //foreach (Listing myListing in item.listing)
                //{
                //    newListing.Add(new Listing
                //    {
                //        Category = "Booties",
                //        Pic = myListing.Pic,
                //        Title = myListing.Title,
                //        Price = myListing.Price,
                //        Source = myListing.Source,
                //        MFG = myListing.MFG,
                //        MFGPart = myListing.MFGPart,
                //        Active = myListing.Active
                //    });
                //}
                List<string> details = new List<string>();
                foreach (string detail in item.Details)
                {
                    details.Add(detail);
                }

                Items.Add(new productJSON {
                    Category = myCategory, 
                    Type = types,
                    Listing = item.Listing,
                    Details = details
                });
            }
            var serializedFinal = serializer.Serialize(Items);
            string updatedFileContents = serializedFinal;
            System.IO.File.WriteAllText(System.Web.HttpContext.Current.Server.MapPath("~/JSON/BioSafetyCabinets.json"), updatedFileContents);
        }
        private class productJSON {
            public List<string> Type;
            public object Listing;
            public List<string> Details;
            public List<string> Category;
        }
        public class Listing{
            public string Category;
            public string Pic;
            public string Title;
            public string Price;
            public string Source;
            public string MFG;
            public string MFGPart;
            public string Active;
        }

    }

}