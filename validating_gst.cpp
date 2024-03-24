#include<iostream>
#include<bits/stdc++.h>
using namespace std;
int main()
{
    string c_value;
    int count=0;
    map<char,int> umap;

    for(int i=0;i<10;i++)
    {
        c_value=to_string(i);
        umap[c_value[0]]=count;
        count++;
    }

    for(char i='A'; i<='Z'; i++)
    {
        
        umap[i]=count;
        count++;
    }

     for(auto i : umap)
    {   
        cout<<i.first<<" "<<i.second;
        cout<<endl;
    }


    cout<<"Enter the 15-Digit GST Number"<<endl;
   
    string gst_i; 
    string gst;
    
    cin>>gst_i;

    
    // if(gst_i.length()!=15 || gst_i[5]!='C')
    
    if(gst_i.length()!=15 )
    {
        cout<<"Invalid Number"<<endl;
        cout<<gst_i.length();
        return 0;
    }

    
    
    gst=gst_i;
    gst=gst.erase(14);
  
    vector<int> weights;
    
    for(int i=0;i<gst.length();i++)
    {
        auto it =umap.find(gst[i]);
        if(it!=umap.end())
        {
            weights.push_back(it->second);
        }
    }



    vector<int> multipler{1,2,1,2,1,2,1,2,1,2,1,2,1,2};


    
    // for(int i=0;i<weights.size();i++)
    // {
    //     cout<<weights[i]<<endl;   
    // }

vector<int> product;

for(int i=0;i<=14;i++)
{
    product.push_back(weights[i]*multipler[i]);
}

vector<int> remainder;
vector<int> quo;
vector<int> hash_code;
int hash_sum=0;


for(int i=0;i<product.size();i++)
{
    remainder.push_back(product[i]%36);
    quo.push_back(product[i]/36);
    hash_code.push_back(remainder[i]+quo[i]);
}


// for(int i=0;i<=14;i++)
// {
//     hash_code.push_back(remainder[i]+quo[i]);
// }


for(int i=0;i<=14;i++)
{
    hash_sum=hash_sum+hash_code[i];
}

    cout<<"Hash_sum"<<" "<<hash_sum<<endl;
    hash_sum=hash_sum%36;
    hash_sum=36-hash_sum;

    for(auto i : umap)
    {
        if(i.second==hash_sum)
        {
            cout<<"The fifteenth character is:"<<endl;
            cout<<i.first<<endl;
            gst=gst+i.first;
        }
    }

    cout<<gst<<endl;
    cout<<gst_i<<endl;

    if(gst_i==gst)
    {
        cout<<"The GST number is Valid"<<endl;
    }
    else
    {
        cout<<gst_i<<endl;
        cout<<gst<<endl;
        cout<<"The GST number is Invalid"<<endl;
    }

    return 0;
}