import React from 'react';
// import { Link } from 'react-router-dom'
import bookjson from "./bookData.json"
import './App.css';
import photo from './images/mag.svg'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      me:"",
      books: [],
      readingbooks: [],
      Brandon:true,
      Joe:true,
      Agatha:true,
      John:true,
      King:true,
      Sap:true,
      Fantasy:true,
      Drama:true,
      Horror:true,
      genre:[],
      authors:[]
    }
  }
  
  componentDidMount() {
    this.setState({me:document.getElementById("inp")});
        this.setState({imgElement:document.getElementById("magni")});
    this.putDefaultData(bookjson)
 }

  putDefaultData(res) {
    this.setState({
      books: res.data.books,
      // readingbooks: res.data.books 
    })
    
  }

  checking = (x, y) => {
      if(x){
        this.setState({authors: [...this.state.authors, y]})
      }
      else{
          this.setState({authors: this.state.authors.filter(e => {
              if(e!==y)
                return e;
          })})
      }
  }

  checkingGenre = (x,y) => {
    if(x){
      this.setState({genre: [...this.state.genre, y]})
    }
    else{
        this.setState({genre: this.state.genre.filter(e => {
            if(e!==y)
              return e;
        })})
    }
  }

  DynamicSearch = (str) => {
    return this.state.books.filter(ele => ele.title.toLowerCase().includes(str.toLowerCase()) || ele.authors[0].toLowerCase().includes(str.toLowerCase()))
}

DynamicFilter = (val, found) => {
  console.log(this.state.authors);
  return found.filter(ele => ele.authors[0].toLowerCase()===val.toLowerCase())
}

DynamicFilterGenre = (val, found) => {
  console.log("test");
  console.log(this.state.genre);
  return found.filter(ele => ele.genre.toLowerCase()===val.toLowerCase())
  
}
anim(x){
  this.setState({ search: x });  
}

  render() {

    if(this.state.me!==""){
      if(this.state.search===""){
        this.state.me.classList.remove("kopen");
        this.state.me.classList.add("kclose");
        // this.state.imgElement.classList.add("iclose");
         this.state.imgElement.classList.remove("iopen");
        }
    else{
      // this.state.imgElement.classList.remove("iclose");
       this.state.imgElement.classList.add("iopen");
      this.state.me.classList.add("kopen");
      this.state.me.classList.remove("kclose");
    }
  }
    let uniq=[]
    let found = []
    found = this.DynamicSearch(this.state.search)
    if( this.state.Brandon===true&&
      this.state.Joe===true&&
      this.state.Agatha===true&&
      this.state.John===true&&
      this.state.King===true&&
      this.state.Sap===true&&
      this.state.Fantasy===true&&
      this.state.Drama===true&&
      this.state.Horror===true){
        uniq=found;
      }
      else{
         if(this.state.Brandon===true&&
          this.state.Joe===true&&
          this.state.Agatha===true&&
          this.state.John===true&&
          this.state.King===true&&
          this.state.Sap===true){
            let results = [];
            this.state.genre.map( ele => {
              this.DynamicFilterGenre(ele, found).map(e =>{
              results.push(e);
              return 0;
            });
          })
        //new
          this.state.authors.map( ele => {
            this.DynamicFilter(ele, results).map(e =>{
            results.push(e);
            return 0;
          });
        })
            uniq = [...new Set(results)]; 
          }
          else{
    let results = [];
    this.state.authors.map( ele => {
      this.DynamicFilter(ele, found).map(e =>{
      results.push(e);
      return 0;
    });
  })
//new
  this.state.genre.map( ele => {
    this.DynamicFilterGenre(ele, results).map(e =>{
    results.push(e);
    return 0;
  });
})
    uniq = [...new Set(results)]; 
    console.log(results);
    console.log(this.state.authors);
    console.log(this.state.Brandon);
}
}
  
    return <div className='wholePage'>
      <h1>Library Management</h1>
      <div className="box1">
            
            <input type="text" className="input" name="txt" id="inp"  onChange={(e) =>  this.anim(e.target.value)}  />

            <button className="btni" id="magni"> <img  className="img1" src={photo} height="30" width="30" alt=""></img></button>
        </div>


       <h2 className="filter">Filters </h2>
        <div className='parentFilter'>
          <div className="Authors">
            <label>Authors</label>
            <div>
              <input type="checkbox" className="chk"  onChange={(e) =>{this.setState({Brandon:!this.state.Brandon}); this.checking(this.state.Brandon, "Brandon Sanderson")}} />
              <label> Brandon Sanderson &nbsp; (5)</label>
            </div>
            <div>
              <input type="checkbox" className="chk" onChange={(e) =>{this.setState({Joe:!this.state.Joe}); this.checking(this.state.Joe, "Joe Abercrombie")}} />
              <label> Joe Abercrombie &nbsp; (5)</label>
            </div>
            <div>
            <input type="checkbox" className="chk" onChange={(e) =>{this.setState({Agatha:!this.state.Agatha}); this.checking(this.state.Agatha, "Agatha Christie")}}/>
              <label> Agatha Christie &nbsp; (5)</label>
            </div>
            <div>
              <input type="checkbox" className="chk" onChange={(e) =>{this.setState({John:!this.state.John}); this.checking(this.state.John, "John Green")}}/>
              <label> John Green &nbsp; (5)</label>
            </div>
            <div>
              <input type="checkbox" className="chk" onChange={(e) =>{this.setState({Sap:!this.state.Sap}); this.checking(this.state.Sap, "Andrzej Sapkowski")}}/>
              <label> Andrzej Sapkowski &nbsp; (5)</label>
            </div>
            <div>
              <input type="checkbox" className="chk" onChange={(e) =>{this.setState({King:!this.state.King}); this.checking(this.state.King, "Stephen King")}}/>
              <label> Stephen King  &nbsp; (5)</label>
            </div>
          </div>
          
          <div className="Genre">
          <label>Genre</label>
          <div>
            <input type="checkbox"  className="chk" onChange={(e) =>{this.setState({Fantasy:!this.state.Fantasy}); this.checkingGenre(this.state.Fantasy, "Fantasy")}}/>
            <label> Fantasy &nbsp; (15)</label>
            </div>
            <div>
            <input type="checkbox" className="chk" onChange={(e) =>{this.setState({Drama:!this.state.Drama}); this.checkingGenre(this.state.Drama, "Drama")}}/>
            <label> Drama &nbsp; (10)</label>
            </div>
            <div>
            <input type="checkbox" className="chk" onChange={(e) =>{this.setState({Horror:!this.state.Horror}); this.checkingGenre(this.state.Horror, "Horror")}}/>
            <label> Horror &nbsp;  (5)</label>
            </div>
          </div>

          <div className="Year">
          <label>Year</label>
          <div>
            <input type="checkbox" className="chk"/>
            <label>Before 2000  &nbsp; (15)</label>
            </div>
            <div>
            <input type="checkbox" className="chk"/>
            <label> 2001-2010 &nbsp; (7)</label>
            </div>
            <div>
            <input type="checkbox" className="chk"/>
            <label> 2011-2015 &nbsp; (7)</label>
            </div>
            <div>
            <input type="checkbox" className="chk"/>
            <label> 2016-2020 &nbsp; (1)</label>
            </div>
          </div>


        </div>

      <h2>Books Available</h2>
      <div className='parentReading'>

{
//if filter
uniq.length===0 ? <div className='noResult'>No results found.</div> : uniq.map((e) => {
                  return <div className='bookCard'>

                        <div><img src={e.imageLinks.thumbnail} alt=""></img></div>
                        <div>{e.title}</div>
                        <div className='author'>{e.authors[0]}</div>

                        
                    </div>
                  
                },)
              }
                
      </div >



      
    </div >
  }
}
export default App;
