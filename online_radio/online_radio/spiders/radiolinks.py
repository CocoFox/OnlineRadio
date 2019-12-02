# -*- coding: utf-8 -*-
import scrapy 

from selenium import webdriver

class ToScrapeCSSSpider(scrapy.Spider):
    name = "link-spider"
    start_urls = [
        'http://127.0.0.1:8080/',
    ]

    def __init__(self):
        self.driver = webdriver.Firefox()

    def parse(self, response):
        self.driver.get(response.url)
        for url in self.driver.find_elements_by_css_selector("li.node"):
            yield {
                "title": url.value_of_css_property("div.li > a.urlextern::text"),
                "url": url.value_of_css_property("ul.fix-media-list-overlap > li.level2 > div.li > a.urlextern::attr(href)")
            }
            

