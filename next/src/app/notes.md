# How the Controller will work

## Floating button

- a button that will contain a logo will be movable on the screen that is the
  button can be clicked on and dragged to other spots on the screen. 

## Pop up in the top left corner

- once the button is clicked there will be a popup window that shows the
  contents of the visualization currently on the screen

## Each visualization has a row

- the next app stores 5 dicts in a list that manage the details of the
  visualization 
- the 5 dicts contain stock information and svgs that are the visualization
- the stock information for each dict will be shown in this area and each row
  will include a pencil icon for editing that stuff and a trash can for removing
  the current visualization
- the stock information must be conditionally rendered based on the contents of
  the context and there must be a conditionally rendered plus button that
  renders under the list of stock information but not when there are the full
  five showing
- the stock info will list out the ticker, company name, value, and time and
  these are simple like this TSLA, Tesla, Price, 6 Months
- then at the end of the row will be a pencil icon and a trash icon
- the use of the pencil will trigger a few things to happen
    - the company name will switch into a search bar input that changes sets the
      variables in the context for the ticker 
    - then when a selection is made the focus is moved to a drop down menu that
      has the options of the value in context which the options are Price,
      Volume, RSI, and SMA and the context is then set accordingly
    - then the focus will be directed to another drop down which will be the
      time span and the time span will have 4 selections and they will be 3 
      Month 6 Month 1 Year and an experimental 5 year and the context will be
      changed to match what is selected
    - if the user clicks on the div that is surrounding everything then the
      popup will be closed and the button will appear again

## Any click outside the Controller will close the Pop up and show the button

- there is a div that lives under the popout and button completely and is the
  full size of the screen 
- there will be a function that will collapse the popup and show the button if 
  the button has already been clicked
- the button and the pop up should not show up at the same time as the button


# Data fetching and SVG rendering with context

- the main idea is that once the user completes the ticker/name, value, time
  form sort of submission that a process will be kicked off 
- the idea is that once those are changed an api request is sent that fetches
  data 
- the data is then sent to another thing that generates a graph from the data 
- the graph is an svg which will then be put into the context 
- a separate component will be listening for changes in the svg in the context
  and when there is an update to the svg values then it will rerender the main
  container






