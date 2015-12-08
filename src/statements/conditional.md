Where do they appear?

Often a section is rendered based on a condition

The else construct will not be used.abbrev

what is unique about dompoint is the pointing to elements.abbrev

which means you do not define the condition around the elements.
But you specify a condition *for* a element.

Where ofcourse the condition then also applies to what that element contains.

So if an <ul> must only render if there are any items, we need a way to specify that.
Decisions are only made based on what is available to us from the data.

"header": "items.length" (either 0 or more which is true)
"header": ["items.length"] // multiple conditions
"header": ["name == 'Rob'"]

We then come to basically what angular is doing with expressions.
Filters, as I see it do not really belong in the template.
They can all be run before data enters the template.

However ofcourse the Component must know the real data also.
So these filters will run just before placement.
Anyway all those are not part of the template engine itself.

The conditionals however are.
In that way, you could even reduce conditionals to flags, nothing more.
Because you can calculate up front what that condition should be.
And you will not be limited in how you came to that decession.

Ofcourse Teflon UI, does have to create it's own logic for this and thus can implement the above.

I think there isn't even much more to templates than data placement and conditionals.

Placement would then be based on a data object and an instruction set.
Give me the data and tell me how I should place it and what are the decissions I should make while I'm
placing it.

 - you must not render the list at all if there are no items
 - if there is no photo, you must place a default image.
 - each row should have a odd/even class
 - when a user in the user list is online you should display a green led
 - you should add a category class for each category.
 - only render 10 items, if there are less still display 10 rows
 - names should be capitalized.

 For the above most fall into the category, great, so just send me the data like that..
 It is obvious the conditions/instructions are a seperate data object. They must not be mixed with the data.
 {
   "data": ....
   "instruction": ....
 }
 And it also becomes obvious, the instruction does not need to be an instruction, but can actually be a demand.
 The template does not even have to be aware why something must be removed etc.
 It's actually about removal and addition.


